var Countries = require('./models/countries.js');
var countries = new Countries;

var init = function(){
  var url = "https://restcountries.eu/rest/v2";
  var bucketListUrl = "mogodb://localhost:27017/api/countries";
  var button = document.getElementById("submit-button");
  button.addEventListener('click', handleButtonClick);
  makeRequest(url, requestComplete);
  makeRequest(bucketListUrl, requestBucketComplete)

}

var handleButtonClick = function(){
  var ul = document.getElementById('ul-bucket');
  var li = document.createElement('li');
  var selection = document.getElementById('countries-list');
  console.log(selection.value);

  countries.add({name: selection.value}, function(data){
    this.render(data);
  }.bind(this))
  li.innerText = selection.value;
  ul.appendChild(li)

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countriesObj = JSON.parse(jsonString);
  // var country = countriesObj.;
  console.log(countriesObj)
  populateList(countriesObj)
}

var requestBucketComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countriesObj = JSON.parse(jsonString);
  // var country = countriesObj.;
  console.log(countriesObj)
  populateBucketList(countriesObj)
}

var populateList = function(countries){
  var select = document.querySelector('#countries-list');
  countries.forEach(function(country){

    var optionTag = document.createElement("option");
    optionTag.innerText = country.name
    select.appendChild(optionTag);
  });
}

var populateBucketList = function(countries){
  var select = document.querySelector('#ul-bucket');
  countries.forEach(function(country){

    var liTag = document.createElement("li");
    liTag.innerText = country.name
    select.appendChild(liTag);
  });
}

window.addEventListener('load', init);