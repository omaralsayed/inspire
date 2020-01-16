"use strict";

let textArray = [];
let authArray = [];
let quotes = "../../data/quotes.json";

$(document).ready(function() {
    $.getJSON(quotes).done(function (data) {
        const n = data.length - 1;
        const rand = Math.floor(Math.random()*n) + 1;
        textArray = data[rand].quoteText;
        authArray = data[rand].quoteAuthor;
        document.getElementById('quote').innerHTML  = '"'  + textArray + '"';
        document.getElementById('author').innerHTML = '- ' + authArray;
    });
});

$("#next").click(function() {
    $.getJSON(quotes).done(function (data) {
      const n = data.length - 1;
      const rand = Math.floor(Math.random()*n) + 1;
      textArray = data[rand].quoteText;
      authArray = data[rand].quoteAuthor;
      document.getElementById('quote').innerHTML  = '"'  + textArray + '"';
      document.getElementById('author').innerHTML = '- ' + authArray;
   });
});

$('#append').click(function () {
   $('#tbody').append('<tr id="tr"><td>' + authArray + '</td><td>' + textArray + '</td><td><button id="remove" class="btn"> Remove </td></tr>');
});

$('#remove').click(function() {
   // TODO
});