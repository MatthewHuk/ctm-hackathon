const express = require('express');
const router = express.Router();
const HttpStatus = require("literal-http-status");
const {carEnquiriesInPostcode, getCarEnquiriesAll} = require("../services/enquiriesService")
const {carEnquiriesAll} = require("../services/db");

router.get('/all', async (req, res) => {
    try {
        console.log("called /enquiry/all")
        const CarEnquiriesResponse = await carEnquiriesAll()
        res.status(HttpStatus.OK).json(CarEnquiriesResponse);
    } catch (error) {
        console.log(`Something went wrong in carEnquiry.js, the error is: ${error}`);
        res.status(HttpStatus['Internal Server Error']).json(error);
    }
});

router.get('/:postcode', async (req, res) => {
    try {
        console.log("called /enquiry/:postcode")
        const CarEnquiriesResponse = await carEnquiriesInPostcode(req.params.postcode);
        res.status(HttpStatus.OK).json(CarEnquiriesResponse);
    } catch (error) {
        console.log(`Something went wrong in carEnquiry.js, the error is: ${error}`);
        res.status(HttpStatus['Internal Server Error']).json(error);
    }
});



module.exports = router;