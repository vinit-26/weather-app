const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geoCode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Vinit',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Vinit',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Vinit',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.status(404).json({ error: 'Please Provide address.' });
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.status(500).json({ error });
    }
    forcast(data, (error, forcastData) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json({
        forcast: forcastData,
        location: data.location,
        address: req.query.address,
      });
    });
  });
  // res.status(200).json({
  //   address: req.query.address,
  // });
});

app.get('/help/*', (req, res) => {
  res.render('error-404', {
    title: '404',
    name: 'Vinit',
    errorMsg: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('error-404', {
    title: '404',
    name: 'Vinit',
    errorMsg: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
