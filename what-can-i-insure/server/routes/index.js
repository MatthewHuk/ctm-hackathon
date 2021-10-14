const express = require('express');
const router = express.Router();

/* GET root. */
router.get('/', function(req, res) {
  res.contentType("application/json");
  res.status(200).json("Welcome to Quoting");
});


module.exports = router;