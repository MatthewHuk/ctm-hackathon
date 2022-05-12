const express = require('express');
const router = express.Router();
const carEnquiryRouter = require('./carEnquiry');

/* GET root. */
router.get('/', function(req, res) {
  res.contentType("application/json");
  res.status(200).json("Welcome to Quoting");
});

router.use('/enquiry', carEnquiryRouter);

module.exports = router;