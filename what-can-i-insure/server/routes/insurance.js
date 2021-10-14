const express = require('express');
const router = express.Router();
const {lookupData} = require("../database")
const _ = require("lodash");

/* GET root. */
router.get('/insurance/:postcode/:age', function(req, res) {
    const postcode = req.params?.postcode;
    const age = req.params?.age;
    
    res.contentType("application/json");
    dateOfBirthToAge(lookupData[0].DateOfBirth);
    const matchingDataByPostcode = matchByPostcode(postcode);
    if (matchingDataByPostcode.length > 0){
        let matchingData = matchByAge(age, matchingDataByPostcode)

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
            return {Make: m.Make, Model: m.Model, annualPremium: averageByModel}
        });

        console.log({averagedModel});

        if (matchingData.length > 0) {
            res.status(200).json({postcode,age,averagedModel});
        }
    }
    res.sendStatus(204);
});

const matchByPostcode = postcode => {
    const outerPostcode = postcode.split(' ')[0];
    const matchesByPostcode = lookupData.filter(data => data.postcode.split(' ')[0] === outerPostcode)

    return matchesByPostcode;
}

const matchByAge = (queryAge, matchesByPostcode, tolerance) => {
    return matchesByPostcode.filter(data => dateOfBirthToAge(data.DateOfBirth) === Number(queryAge));
}

const dateOfBirthToAge = dateOfBirth => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
}


module.exports = router;