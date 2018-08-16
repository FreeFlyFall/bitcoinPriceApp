"use strict";

// Select html elements using Jquery.
var priceDisplay = $("#price");
var list = $("#list");
var input = $("#input1");
var button = $("button");

// Initial get on load.
window.onload = function(){
  let currency = $(list).val();
  requestPrice(currency);
};

/*
When the currency list is changed, set a variable "currency" equal
to it's value, request the BPI of that currency, and set the
input field to display that currency's ISO code.
*/
$(list).change(function(){
  let currency = $(list).val();
  requestPrice(currency);
  $(input).val(currency);
});

// When a key is pressed, if it is enter, click the button.
$(input).keydown(function(e) {
  if (e.keyCode === 13) {
    $(button).click();
  }
});

/*
When the refresh button is clicked, assign it's uppercase value
to a variable, change the currency in the list to be the currency
in the input field, and request the BPI of that currency.
Also remove the button's outline upon focus.
*/
$(button).click(function() {
  let currency = $(input).val().toUpperCase();
  $(list).val(currency);
  requestPrice(currency);
  button.blur();
});

/*
If the currency is supported by realtime updates, request info from
the realtime updates url; otherwise, request info from the full url.
Send get request for the JSON data using the custom url,
reformat the data, display the BPI on the page and in the console.
*/
function requestPrice(currency) {
  var url;
  if (currency === "USD" || currency === "EUR" || currency === "GBP"){
  url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  } else {
  url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}/.json`;
  }

  $.getJSON(url)
  .done(function(data){
    const priceString = data.bpi[currency].rate;
    const priceFloat = parseFloat(priceString.replace(/,/g, ""));
    const priceRound = priceFloat.toFixed(2);
    const price = `${delimitNumbers(priceRound)} ${currency}`;
    $("#price").text(price);
    console.log(`1 XBT = ${price}`);
    }
  );
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