/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Countries = __webpack_require__(1);
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Country = __webpack_require__(2)

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var Country = function(options){
  this.name = options.name;
}

module.exports = Country;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map