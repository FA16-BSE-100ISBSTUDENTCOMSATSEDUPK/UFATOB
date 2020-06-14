const mongoose = require('mongoose');

const BlockchainSchema = mongoose.Schema({
  chain: [
    {
      index: {
        type: Number,
      },
      timeStamp: {
        type: String,
      },
      transactions: [
        {
          amount: {
            type: Number,
          },
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          transactionId: {
            type: String,
          },
          timeStamp: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      nonce: {
        type: Number,
      },
      hash: {
        type: String,
      },
      previousBlockHash: {
        type: String,
      },
    },
  ],
  pendingTransactions: [
    {
      amount: {
        type: Number,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      transactionId: {
        type: String,
      },
      timeStamp: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  currentNodeUrl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = Blockchain = mongoose.model('blockchain', BlockchainSchema);
