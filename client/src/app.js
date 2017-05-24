var init = function(){
  var select = document.querySelector('#countries-list');
}

var addToDropDown = function(select, newItem){
  var newDrop = document.createElement("option");
  newDrop.innerText = newItem;
  select.appendChild(newDrop)
}

window.addEventListener('load', init);