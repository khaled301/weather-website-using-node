const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/6f4bf86b9631c3466da70de46e638789/${latitude}, ${longitude}`;
    // const url = `https://api.darksky.net/forecast/{YOUR API KEY FROM darksky.net}/${latitude}, ${longitude}`;

    //Object Destructure is used for Response Object = { body }
    request( { url, json: true }, ( err, { body }) => {

        if(err) {
            callback('Unable to connect to Forecasting services!', undefined);
        }
        else if (body.error) {
            callback('Unable to find forecast. Please check for location coordinate error.', undefined);
        }
        else{
            const data = {
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            }

            callback(undefined, data);
        }
    });

};

module.exports = {
    forecast
};
