'use strict';

let rows = 0;
let count = [0, 0];

document.getElementById('pinned-quotes').style.display = 'none';

$(document).ready(function() {
   let id = 0;
   let randSentArray = [];
   let idArray = [];
   let tpArray = [];

   $('#append-random').click(function () {
      randSentArray.push((Math.random() * (0.9 - 0.4) + 0.4));
      idArray.push(id);
      tpArray.push('Random');

      $('#tbody').append('<tr><td class="align-middle">' + id + '</td><td class="align-middle">' + author + '</td><td class="align-middle">' 
      + quote + '</td><td class="align-middle">' + tpArray[tpArray.length - 1] + '</td><td class="align-middle">' + randSentArray[randSentArray.length - 1] 
      + '</td><td><button class="btn remove"> Remove </td></tr>');

      if (document.getElementById('pinned-quotes').style.display != 'block') {
         document.getElementById('pinned-quotes').style.display = 'block';
         document.getElementById('title-pin').innerHTML = '';
         document.getElementById('title-vis').innerHTML = '';
         document.getElementById('canvas').style.display = 'block';
         document.getElementById('canvas-1').style.display = 'block';
      }
      
      rows++;
      id++;
      count[1]++;
   });

   let tfQuote = '';
   let tfAuthor = '';

   $('#append-custom').click(function () {
      randSentArray.push((Math.random() * (0.9 - 0.4) + 0.4));
      idArray.push(id);
      tpArray.push('Custom');

      tfAuthor = document.getElementById('regex-author').innerHTML.substring(2);
      tfQuote = document.getElementById('regex-quote').innerHTML;
      
      // Remove quotation marks from quote text
      tfQuote = tfQuote.substring(1, tfQuote.length - 1);

      $('#tbody').append('<tr><td class="align-middle">' + id + '</td><td class="align-middle">' + tfAuthor + '</td><td class="align-middle">' 
      + tfQuote + '</td><td class="align-middle">' + tpArray[tpArray.length - 1] + '</td><td class="align-middle">' + randSentArray[randSentArray.length - 1] 
      + '</td><td><button class="btn remove"> Remove </td></tr>');

      if (document.getElementById('pinned-quotes').style.display != 'block') {
         document.getElementById('pinned-quotes').style.display = 'block';
         document.getElementById('title-pin').innerHTML = '';
         document.getElementById('title-vis').innerHTML = '';
         document.getElementById('canvas').style.display = 'block';
         document.getElementById('canvas-1').style.display = 'block';
      }

      rows++;
      id++;
      count[0]++;
   });

   if (!rows) {
      document.getElementById('pinned-quotes').style.display = 'none';
      document.getElementById('title-pin').innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('canvas-1').style.display = 'none';
      document.getElementById('title-vis').innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
   }

   /**
    * Create a dynamic line chart
    */
   let line = new Chart(document.getElementById('canvas'), {
      type: 'line',
      data: {
         labels: idArray,
         datasets: [{ 
            data: randSentArray,
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
   let doughnut = new Chart(document.getElementById('canvas-1'), {
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

   // Update charts on random button click
   $(function() {
      $("#append-random").click(function() {
         line.update();
         doughnut.update();
      });
   });

   // Update charts on custom button click
   $(function() {
      $("#append-custom").click(function() {
         line.update();
         doughnut.update();
      });
   });
});

$(document).on('click', '.remove', function() {
   $(this).closest('tr').remove();
   rows--;
   if (!rows) {
      document.getElementById('pinned-quotes').style.display = 'none';
      document.getElementById('title-pin').innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
      document.getElementById('canvas').style.display = 'none';
      document.getElementById('canvas-1').style.display = 'none';
      document.getElementById('title-vis').innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
   }
});
