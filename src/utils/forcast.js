const request = require('request');

const baseWeatherstackURL = 'http://api.weatherstack.com/current?';
const weatherstack_API_KEY = '8b7081527ce84dbf476132b5fe3b9a73';

const forcast = (location, cb) => {
  const url = `${baseWeatherstackURL}access_key=${weatherstack_API_KEY}&query=${location.lat},${location.lng}`;
  request({ url: url, json: true }, (error, res) => {
    if (error) {
      cb({ message: 'Unable to connect to weather services.' }, null);
    } else if (res.body.error) {
      cb({ message: 'please provide valid location' }, null);
    } else {
      const data = res.body.current;
      cb(null, {
        description: `${data.weather_descriptions[0]}. It is currently ${data.temperature} degree out. It feels like ${data.feelslike} degree.\n\There is ${data.precip}% chance of rain`,
        temperature: data.temperature,
        feelslike: data.feelslike,
      });
    }
  });
};

module.exports = forcast;
