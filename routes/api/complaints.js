const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Complaint = require('../../models/Complaint');
const { connectDB } = require('../../config/db');
const config = require('config');

// @route   POST api/complaints
// @desc    Make a Complaint
// @access  Private
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      name,
      email,
      contactNo,
      registrationNumber,
      description,
      university,
      status,
    } = req.body;

    const complaintFields = {};
    complaintFields.user = req.user.id;
    complaintFields.title = title;
    complaintFields.description = description;
    if (name) complaintFields.name = name;
    if (email) complaintFields.email = email;
    if (contactNo) complaintFields.contactNo = contactNo;
    if (registrationNumber)
      complaintFields.registrationNumber = registrationNumber;
    if (university) complaintFields.university = university;
    complaintFields.status = status;

    try {
      await connectDB(config.get('defaultMongoDatabase'));

      const complaint = new Complaint(complaintFields);

      await complaint.save();
      res.json(complaint);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

// // @route   GET api/complaint
// // @desc    Show all complaint for uni and hec portal
// // @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const complaints = await Complaint.find().sort({ date: -1 });

//     res.json(complaints);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   GET api/complaints/user
// @desc    Get  all complaints by a user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const complaints = await Complaint.find({ user: req.user.id });
    res.json(complaints);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/complaints/:id
// @desc    Get complaint by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    await connectDB(config.get('defaultMongoDatabase'));

    const complaint = await Complaint.findById(req.params.id);
    res.json(complaint);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
