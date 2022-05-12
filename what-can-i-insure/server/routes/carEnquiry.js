const express = require('express');
const router = express.Router();
const {carEnquiriesByLocation} = require("../services/db");
const HttpStatus = require("literal-http-status");
const axios = require("axios");
const {carEnquiriesInPostcode} = require("../services/enquiriesService")

router.get('/:postcode', async (req, res) => {
    try {
        const CarEnquiriesResponse = await carEnquiriesInPostcode(req.params.postcode);
        res.status(HttpStatus.OK).json(CarEnquiriesResponse);
    } catch (error) {
        console.log(`Something went wrong in carEnquiry.js, the error is: ${error}`);
        res.status(HttpStatus['Internal Server Error']).json(error);
    }
});

module.exports = router;