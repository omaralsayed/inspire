'use strict';

let rows = 0;
let count = new Array(0, 0);

let pinQuoteElement = document.getElementById('pinned-quotes');
let titlePinElement = document.getElementById('title-pin');
let titleVisElement = document.getElementById('title-vis');
let canvas00Element = document.getElementById('canvas');
let canvas01Element = document.getElementById('canvas-1');

async function fetchSentiment(captionText) {
   const options = {
     method: 'POST',
     body: JSON.stringify({ captionText }),
     headers: new Headers({ 'Content-Type': 'application/json' })
   }
 
   return await fetch('/sentiment/analyzer', options)
      .then(response => response.json())
      .then(({ sentiment }) => {
         return sentiment;
      })
     .catch(error => {
         console.error('Request Failed:', error)
      }
   );
}

// Do not display pinQuoteElement (default)
pinQuoteElement.style.display = 'none';

$(document.getElementById('quote')).ready(function() {
   let id = 0;
   let stArray = new Array();
   let idArray = new Array();
   let tpArray = new Array();

   $('#append-random').click(function () {
      let text = document.getElementById('quote').innerHTML;

      fetchSentiment(text)
      .then(function(data) {
         idArray.push(id);
         tpArray.push('Random');
         stArray.push(data);

         $('#tbody').append('<tr><td class="align-middle">' + id + '</td><td class="align-middle">' + author + '</td><td class="align-middle">' 
         + quote + '</td><td class="align-middle">' + tpArray[tpArray.length - 1] + '</td><td class="align-middle">' + stArray[stArray.length - 1] 
         + '</td><td><button class="btn remove"> Remove </td></tr>');

         if (pinQuoteElement.style.display != 'block') {
            titlePinElement.innerHTML = '';
            titleVisElement.innerHTML = '';
            pinQuoteElement.style.display = 'block';
            canvas00Element.style.display = 'block';
            canvas01Element.style.display = 'block';
         }

         line.update();
         dnut.update();
         
         id++;
         rows++;
         count[1]++;
      });
   });

   let tfQuote = '';
   let tfAuthor = '';

   $('#append-custom').click(function () {
      tfAuthor = document.getElementById('regex-author').innerHTML.substring(2);
      tfQuote = document.getElementById('regex-quote').innerHTML;
      
      // Remove quotation marks from quote text
      text = tfQuote.substring(1, tfQuote.length - 1);

      fetchSentiment(text)
      .then(function(data) {
         idArray.push(id);
         tpArray.push('Custom');
         stArray.push(data);
   
         $('#tbody').append('<tr><td class="align-middle">' + id + '</td><td class="align-middle">' + tfAuthor + '</td><td class="align-middle">' 
         + tfQuote + '</td><td class="align-middle">' + tpArray[tpArray.length - 1] + '</td><td class="align-middle">' + stArray[stArray.length - 1] 
         + '</td><td><button class="btn remove"> Remove </td></tr>');
   
         if (pinQuoteElement.style.display != 'block') {
            titlePinElement.innerHTML = '';
            titleVisElement.innerHTML = '';
            pinQuoteElement.style.display = 'block';
            canvas00Element.style.display = 'block';
            canvas01Element.style.display = 'block';
         }

         line.update();
         dnut.update();
         
         id++;
         rows++;
         count[0]++;
      });
   });

   if (!rows) {
      pinQuoteElement.style.display = 'none';
      canvas00Element.style.display = 'none';
      canvas01Element.style.display = 'none';
      titlePinElement.innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
      titleVisElement.innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
   }

   /**
    * Create a dynamic line chart
    */
   let line = new Chart(canvas00Element, {
      type: 'line',
      data: {
         labels: idArray,
         datasets: [{ 
            data: stArray,
            label: 'Sentiment Value',
            borderColor: '#799bc7',
            fill: false
         }]
      },
      options: {
         responsive: true,
         aspectRatio: 2.5,
         title: {
            display: true,
            text: 'Sentiment Analysis'
         },
         scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Sentiment Value'
              }
            }],
            xAxes: [{
               scaleLabel: {
                 display: true,
                 labelString: 'Quote ID'
               }
            }]
         }
      }
   });
   
   /**
    * Create a dynamic doughnut chart
    */
   let dnut = new Chart(canvas01Element, {
      type: 'doughnut',
      data: {
         datasets: [{
            data: count,
            backgroundColor: ['#799bc7', '#f9d77e'],
            label: 'Custom-Random Dataset'
         }],
         labels: ['Custom', 'Random']
      },
      options: {
         responsive: true,
         aspectRatio: 2.75,
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Quote Type Analysis'
         },
         animation: {
            animateScale: true,
            animateRotate: true
         }
      }
   });
});

$(document).on('click', '.remove', function() {
   $(this).closest('tr').remove();

   rows--;
   if (!rows) {
      pinQuoteElement.style.display = 'none';
      canvas00Element.style.display = 'none';
      canvas01Element.style.display = 'none';
      titlePinElement.innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
      titleVisElement.innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
   }
});
