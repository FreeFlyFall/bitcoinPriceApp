"use strict";
//Select html elements
var header = document.getElementById("header");
var priceDisplay = document.getElementById("price");
var list = document.getElementById("list");
var input = document.getElementById("input1");
var button = document.querySelector("button");
var currency = list.value;

// initial get on load
window.onload = function(){
  requestPrice(currency);
};

list.addEventListener("change", function(){
  var currency = list.value;
  requestPrice(currency);
  input.value = currency;
});

input.addEventListener("keydown", function(event) {
  //click on enter keypress
  if (event.keyCode === 13) {
    document.querySelector("button").click();
  }
});

button.addEventListener("click", function() {
        var inputText = input.value.toUpperCase();
        requestPrice(inputText);
        button.blur();
        list.value = inputText;
});

function requestPrice(currency) {
  if (currency === "USD" || currency === "EUR" || currency === "GBP"){
  var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  } else {
  var url = "https://api.coindesk.com/v1/bpi/currentprice/" +
  currency + "/.json";
  }

  fetch(url)
  .then(function(res){
    // console.log(res);
    return res.json();
  })
  .then(function(data){
    var priceString = data.bpi[currency].rate;
      var priceFloat = parseFloat(priceString.replace(/,/g, ""));
      var priceRound = priceFloat.toFixed(2);
      var price = delimitNumbers(priceRound);
      priceDisplay.textContent = price + " " + currency;
      console.clear();
      console.log(price);
  });
}

function delimitNumbers(str) {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ?
    b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}