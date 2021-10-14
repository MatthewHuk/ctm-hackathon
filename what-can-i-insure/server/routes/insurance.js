const express = require('express');
const router = express.Router();
const {lookupData} = require("../database")

/* GET root. */
router.get('/insurance/:postcode/:age', function(req, res) {
    const postcode = req.params?.postcode;
    const age = req.params?.age;
    
    res.contentType("application/json");
    dateOfBirthToAge(lookupData[0].DateOfBirth);
    const matchingDataByPostcode = matchByPostcode(postcode);
    if (matchingDataByPostcode.length > 0){
        let matchingData = matchByAge(age, matchingDataByPostcode)
        if (matchingData.length > 0) {
            res.status(200).json({postcode,age,matchingData});
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