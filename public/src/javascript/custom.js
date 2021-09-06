'use strict';

let regexQuoteHTML = document.getElementById('regex-quote').innerHTML;
let regexAuthorHTML= document.getElementById('regex-quote').innerHTML;

$(document).ready(function() {
    $.getJSON(quotes).done(function(data) {
        // A tensor in this context is a stringified JSON object
        const tensor = document.getElementById('tf').innerText;

        // Elimination of '"' and ',' using regular expressions
        const keywords = tensor.replace(/"|,/g, '').split(' ');

        let match= false;
        let done = false;

        for (let k = 0; k < keywords.length - 1; k++) {
            for (let i = 0; i < data.length - 1; i++) {
                // If a keyword exists in JSON dataset
                if (data[i].quoteText.toLowerCase().includes(keywords[k].toLowerCase())) {
                    quote = data[i].quoteText;
                    author= data[i].quoteAuthor;
                    done = match = true;
                    break;
                    // If a keyword does not exists in JSON dataset 
                } else {
                    continue;
                }
            }
            if (done) {
                break;
            }
        }

        // Post quote on match establishment
        if (match) {
            regexQuoteHTML = '"'  + quote + '"';
            regexAuthorHTML= '- ' + author;
        } else {
            regexQuoteHTML = 'Unable to find a good match.';
            regexAuthorHTML= '';
        }

        // Pre-upload (we do not want to get a match for the placeholder)
        if (tensor == 'Choose file for predictions') {
            regexQuoteHTML = 'Choose file for quote';
            regexAuthorHTML= '';
        }
    });
});