const request = require('request');

/**
 * encodeURIComponent(address) = helps transform special characters like (?) into readable and safe code like (%3F).
 * without encodeURIComponent() app can crash if address has any special character within it
 *
 * @param address
 * @param callbacj
 */

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?
types=address&access_token=pk.eyJ1Ijoia2hhbGVkMzAxIiwiYSI6ImNrMXUyZjZrdDAxdzkzY3FnZ2N3YnZ4NHcifQ.jcMnRZD6yhhe7HyIEM1FOQ&limit=1`;

    request( { url: url, json: true }, (err, response, body) => {

        if (err) {

            callback('Unable to connect to the location services!', undefined);

        }
        else if (response.body.features.length === 0) {

            callback(`Unable to find the location for address => (${address})! Try another search.`, undefined);

        }
        else if (response.body.features.length !== 0){

            const data = {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }

            callback(undefined, data);
        }

    });

};


module.exports = {
    geocode
};
