const express = require('express');
const router = express.Router();
const {lookupData} = require("../database")
const _ = require("lodash");
const axios = require("axios");

/* GET root. */
router.get('/insurance/:postcode/:age', async function(req, res) {
    const postcode = req.params?.postcode;
    const age = req.params?.age;
    
    res.contentType("application/json");

    // call to other backend with postcode and dist in meters
    const { data } = await axios.get(`http://localhost:3001/enquiry/${postcode}`);

    let {latitude,longitude, carsEnquiries} = data

    // filter by age if age is given

    if (carsEnquiries.length > 0){
        let matchingData = matchByAge(age, carsEnquiries)

        let groupedModel = _.groupBy(matchingData, 'Model');

        let log = JSON.stringify(groupedModel);
        console.log({log, matchingData});

        let averagedModel = Object.keys(groupedModel).map((model) => {

            let sumPrice = 0;
            groupedModel[model].forEach((car) => {
                sumPrice += car.annualPremium
            });

            let m = groupedModel[model][0];
            let averageByModel = sumPrice / groupedModel[model].length;
            return {Make: m.Make, Model: m.Model, annualPremium: averageByModel.toFixed(2)}
        });

        console.log({averagedModel});

        if (matchingData.length > 0) {
            return res.status(200).json({postcode,latitude, longitude, age,averagedModel});
        }
    }
    res.sendStatus(204);
});

const matchByAge = (queryAge, prices, tolerance) => {
    return prices.filter(data => dateOfBirthToAge(data.DateOfBirth) === Number(queryAge));
}

const dateOfBirthToAge = dateOfBirth => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
}


module.exports = router;