"use strict";
// Select html elements
var priceDisplay = document.getElementById("price");
var list = document.getElementById("list");
var input = document.getElementById("input1");
var button = document.querySelector("button");
var currency = list.value;

// Initial get on load
window.onload = function(){
  requestPrice(currency);
};

/*
When the currency list is changed, set a variable "currency" equal
to it's value, request the BPI of that currency, and set the
input field to display that currency's ISO code.
*/
list.addEventListener("change", function(){
  var currency = list.value;
  requestPrice(currency);
  input.value = currency;
});

// When a key is pressed, if it is enter, click the button.
input.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    document.querySelector("button").click();
  }
});

/*
When the refresh button is clicked, assign it's uppercase value
to a variable, change the currency in the list to be the currency
in the input field, and request the BPI of that currency.
Also remove the button's outline upon focus.
*/
button.addEventListener("click", function() {
        var inputText = input.value.toUpperCase();
        requestPrice(inputText);
        button.blur();
        list.value = inputText;
});

/*
If the currency is supported by realtime updates, request info from
the realtime updates url; otherwise, request info from the full url.
Send get request for the JSON data using the custom url,
reformat the data, display the BPI on the page and in the console.
*/
function requestPrice(currency) {
  if (currency === "USD" || currency === "EUR" || currency === "GBP"){
  var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  } else {
  var url = "https://api.coindesk.com/v1/bpi/currentprice/" +
  currency + "/.json";
  }

  fetch(url)
  .then(checkRes)
  .then(function(data){
    var priceString = data.bpi[currency].rate;
      var priceFloat = parseFloat(priceString.replace(/,/g, ""));
      var priceRound = priceFloat.toFixed(2);
      var price = delimitNumbers(priceRound);
      priceDisplay.textContent = price + " " + currency;
      console.log("1 XBT = " + price + " " + currency);
  })
  .catch(function(err){
    console.log(err);
  });
}

/*
Function for formatting a number to a comma style format
with a thousands separator.
*/
function delimitNumbers(str) {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ?
    b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}

// Function for checking the xhr response.
function checkRes (res){
  if(!res.ok){
    throw Error(res.status);
  }
  return res.json();
}