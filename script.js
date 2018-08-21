"use strict";

// Select html elements using Jquery.
const priceDisplay = $("#price");
const list = $("#list");

// Initial get on load.
window.onload = function () {
  var currency = "USD";
  requestPrice(currency);
};

/*
When the currency list is changed, set a variable "currency" equal
to it's value, request the BPI of that currency, and set the
input field to display that currency's ISO code.
*/
$(list).change(function () {
  var currency = $(list).val().substring(0, 3).toUpperCase();
  requestPrice(currency);
});

// Reset search
$(list).click(function () {
  $(list).val("");
})

/*
If the currency is supported by realtime updates, request info from
the realtime updates url; otherwise, request info from the full url.
Send get request for the JSON data using the custom url,
reformat the data, display the BPI on the page and in the console.
*/
function requestPrice(currency) {
  var url;
  if (currency === "USD" || currency === "EUR" || currency === "GBP") {
    url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  } else {
    url = `https://api.coindesk.com/v1/bpi/currentprice/${currency}/.json`;
  }

  $.getJSON(url)
    .done(function (data) {
      var priceString = data.bpi[currency].rate;
      var priceFloat = parseFloat(priceString.replace(/,/g, ""));
      var priceRound = priceFloat.toFixed(2);
      var price = `${delimitNumbers(priceRound)} ${currency}`;
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
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function (a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ?
      b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}