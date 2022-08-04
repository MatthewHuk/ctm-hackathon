const express = require('express');
const router = express.Router();
const HttpStatus = require("literal-http-status");
const { carEnquiriesPerCounty} = require("../services/db");

router.post('/county', async (req, res) => {
    try {
        console.log("called /enquiry/county")
        console.log({body: JSON.stringify(req.body)})
        const CarEnquiriesResponse = await carEnquiriesPerCounty(req.body)
        const nEnquiries = CarEnquiriesResponse.length
        const totalPremium = CarEnquiriesResponse.reduce((a, b) => a+b.annualPremium, 0)
        const averagePremium = totalPremium/nEnquiries
        res.status(HttpStatus.OK).json({averagePremium});
    } catch (error) {
        console.log(`Something went wrong in carEnquiry.js, the error is: ${error}`);
        res.status(HttpStatus['Internal Server Error']).json(error);
    }
});

module.exports = router;