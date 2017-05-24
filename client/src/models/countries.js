var Country = require('./country')

var Countries = function(){

};

Countries.prototype = {
  add: function(newCountry, callback){
    var countryData = JSON.stringify(newCountry);
    this.makePostRequest('http://localhost:3000/api/countries', callback, countryData);
  },
  makePostRequest: function(url, callback, payload){
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function(){
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send(payload);
  }
};

module.exports = Countries;