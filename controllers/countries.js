var express = require('express');
var app = express();
var countryRouter = express.Router();

// var countries = require('../client/src/models/countries.js');
// var Country = require('../client/src/models/country.js');

var CountryQuery = require('../db/countryQuery.js');
var query = new CountryQuery();

countryRouter.get('/', function(req,res){
  query.all(function(countries){
    res.json(countries)
  })
})

countryRouter.post('/', function(req,res){
  var country = req.body
  query.add(country, function(results){
    res.json(results)
  })
});

module.exports = countryRouter;