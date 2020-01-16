"use strict";

let quote = [];
let author = [];
let quotes = "../../data/quotes.json";

$(document).ready(function() {
   $.getJSON(quotes).done(function (data) {
      const n = data.length - 1;
      const rand = Math.floor(Math.random()*n) + 1;
      quote  = data[rand].quoteText;
      author = data[rand].quoteAuthor;
      document.getElementById('quote').innerHTML  = '"'  + quote + '"';
      document.getElementById('author').innerHTML = '- ' + author;
   });

   $('#append').click(function () {
      $('#tbody').append('<tr><td>' + author + '</td><td>' + quote + '</td><td><button class="btn remove"> Remove </td></tr>');
   });

   $("#next").click(function() {
      $.getJSON(quotes).done(function (data) {
        const n = data.length - 1;
        const rand = Math.floor(Math.random()*n) + 1;
        quote  = data[rand].quoteText;
        author = data[rand].quoteAuthor;
        document.getElementById('quote').innerHTML  = '"'  + quote + '"';
        document.getElementById('author').innerHTML = '- ' + author;
      });
   });
});

$(document).on('click', '.remove', function() {
   $(this).closest('tr').remove();
});