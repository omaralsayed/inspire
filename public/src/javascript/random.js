'use strict';

const quotes = "../../data/quotes.json";

let quote = [];
let author = [];

$(document).ready(function() {
   $.getJSON(quotes).done(function(data) {
      const n = data.length - 1;
      const rand = Math.floor(Math.random() * n) + 1;
      quote  = data[rand].quoteText;
      author = data[rand].quoteAuthor;
      document.getElementById('quote').innerHTML  = '"'  + quote + '"';
      document.getElementById('author').innerHTML = '- ' + author;
   });

   $("#next").click(function() {
      $.getJSON(quotes).done(function(data) {
        const n = data.length - 1;
        const rand = Math.floor(Math.random() * n) + 1;
        quote  = data[rand].quoteText;
        author = data[rand].quoteAuthor;
        document.getElementById('quote').innerHTML  = '"'  + quote + '"';
        document.getElementById('author').innerHTML = '- ' + author;
      });
   });
});