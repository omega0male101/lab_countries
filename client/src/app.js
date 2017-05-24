var init = function(){
  // var select = document.querySelector('#countries-list');
  var url = "https://restcountries.eu/rest/v2";

  makeRequest(url, requestComplete);
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


var populateList = function(countries){
  var select = document.querySelector('#countries-list');
  countries.forEach(function(country){

    var optionTag = document.createElement("option");
    optionTag.innerText = country.name
    select.appendChild(optionTag);

  });
}

window.addEventListener('load', init);