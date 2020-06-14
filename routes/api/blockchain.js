const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Blockchain = require('../../models/Blockchain');
const { v1 } = require('uuid');
const { check, validationResult } = require('express-validator');
const { proofOfWork, hashBlock } = require('../../utils/blockchain');
const { connectDB } = require('../../config/db');
const config = require('config');

// @route   GET api/blockchain
// @desc    Get blockchain for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    await connectDB(`${req.user.id}`);

    const blockchains = await Blockchain.find();
    res.json(blockchains[0]);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

// @route   POST api/blockchain/transaction
// @desc    Create a new transaction
// @access  Private
router.post(
  '/transaction',
  [
    auth,
    check('amount', 'Amount is required').isInt(),
    check('reciever', 'Reciever is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, reciever } = req.body;

    try {
      // Updating the blockchain of the current user
      await connectDB(`${req.user.id}`);

      const blockchains = await Blockchain.find();
      blockchains[0].pendingTransactions.push({
        amount,
        sender: req.user.id,
        reciever,
        transactionId: v1().split('-').join(''),
      });

      await blockchains[0].save();

      // Updating the blockchain for the rest of the users
      await connectDB(config.get('defaultMongoDatabase'));

      const users = await User.find({
        _id: { $ne: req.user.id },
        type: { $lte: 1 },
      }).select('_id');

      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        await connectDB(`${user.id}`);

        const blockchains = await Blockchain.find();
        blockchains[0].pendingTransactions.push({
          amount,
          sender: req.user.id,
          reciever,
          transactionId: v1().split('-').join(''),
        });

        await blockchains[0].save();
      }

      // Return the blockchain of the current user
      res.send(blockchains[0]);
    } catch (err) {
      console.log(err);
      return res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/blockchain/mine
// @desc    Create a new block in blockchain
// @access  Private
router.put('/mine', auth, async (req, res) => {
  try {
    // Creating the new block for the current user
    await connectDB(`${req.user.id}`);

    const blockchains = await Blockchain.find();

    const lastBlock = blockchains[0].chain[blockchains[0].chain.length - 1];
    const previousBlockHash = lastBlock['hash'];

    const currentBlockData = {
      transactions: blockchains[0].pendingTransactions,
      index: lastBlock['index'] + 1,
    };

    const nonce = proofOfWork(previousBlockHash, currentBlockData);

    const hash = hashBlock(previousBlockHash, currentBlockData, nonce);

    const newBlock = {
      index: lastBlock['index'] + 1,
      timeStamp: Date.now(),
      transactions: blockchains[0].pendingTransactions,
      nonce,
      hash,
      previousBlockHash,
    };

    blockchains[0].chain.push(newBlock);

    blockchains[0].pendingTransactions = [];

    await blockchains[0].save();

    // Adding the newly created block in the blockchain of the rest of the users
    await connectDB(config.get('defaultMongoDatabase'));

    const users = await User.find({
      _id: { $ne: req.user.id },
      type: { $lte: 1 },
    }).select('_id');

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      await connectDB(`${user.id}`);

      const blockchains = await Blockchain.find();

      blockchains[0].chain.push(newBlock);

      blockchains[0].pendingTransactions = [];

      await blockchains[0].save();
    }

    res.json(blockchains[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
