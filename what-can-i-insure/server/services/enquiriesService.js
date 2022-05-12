const axios = require("axios");
const {carEnquiriesByLocation} = require("./db");


const carEnquiriesInPostcode = async (postcode) => {
    const localeData = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
    console.log(localeData.data.result);
    const lat = parseFloat(localeData.data.result.latitude);
    const lon = parseFloat(localeData.data.result.longitude)
    const carsEnquiries = await carEnquiriesByLocation(
        lon, lat);

    return {
        postcode: postcode,
        latitude: lat,
        longitude: lon,
        carsEnquiries: carsEnquiries
    }
}

module.exports = {carEnquiriesInPostcode}