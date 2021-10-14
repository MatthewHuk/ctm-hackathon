const express = require('express');
const router = express.Router();
const {lookupData} = require("../database")

/* GET root. */
router.get('/insurance/:postcode/:age', function(req, res) {

    const postcode = req.params?.postcode;
    const age = req.params?.age;

    res.contentType("application/json");
    res.status(200).json({postcode,age,lookupData});
});


module.exports = router;