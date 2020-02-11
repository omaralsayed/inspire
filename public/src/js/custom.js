'use strict';

$(document).ready(function() {
    $.getJSON(quotes).done(function(data) {
    const n = data.length - 1;
    const tensor = document.getElementById('tf').innerHTML;

    for (let i = 0; i < n; i++) {
        if (data[i].quoteText.toLowerCase().indexOf(tensor.toLowerCase()) != -1) {
            quote = data[i].quoteText;
            author = data[i].quoteAuthor;
            break;
        } else {
            quote = data[i].quoteText;
            author = data[i].quoteAuthor;
        }
    }

    document.getElementById('regex-quote').innerHTML = '"'  + quote + '"';
    document.getElementById('regex-author').innerHTML = '- ' + author;
    });
});