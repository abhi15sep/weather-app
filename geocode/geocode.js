const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=jeQKqacQ0hSF82JJFkiWQwmwyDK3NvKh90&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body === undefined) {
      callback('Unable to find that address.');
    } else if (body.info.statuscode === 0) {
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
