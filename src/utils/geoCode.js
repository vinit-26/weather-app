const request = require('request');

const mapBoxBaseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapbox_API_KEY =
  'pk.eyJ1IjoidmluaXQtMjYiLCJhIjoiY2trdHRmMWg4NDI0bzJ3cXRicm1oem01cCJ9.6gAEN-xPbr1ZxCcmajg1bQ';

const geoCode = (address, cb) => {
  const url = `${mapBoxBaseURL}${encodeURIComponent(
    address
  )}.json?limit=1&access_token=${mapbox_API_KEY}`;
  request({ url: url, json: true }, (error, res) => {
    if (error) {
      cb({ message: 'Unable to connect to location services.' }, null);
    } else if (res.body.features.length === 0) {
      cb({ message: 'Location not found' }, null);
    } else {
      const data = res.body.features[0].center;
      cb(null, {
        lat: data[1],
        lng: data[0],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
