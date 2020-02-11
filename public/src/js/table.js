'use strict';

let rows = 0;

document.getElementById('pinned-quotes').style.display = 'none';

$(document).ready(function() {
   $('#append-random').click(function () {
      $('#tbody').append('<tr><td>' + author + '</td><td>' + quote + '</td><td><button class="btn remove"> Remove </td></tr>');
      if (document.getElementById('pinned-quotes').style.display != 'block') {
         document.getElementById('pinned-quotes').style.display = 'block';
         document.getElementById('title-pin').innerHTML = '<strong> Pinned Quotes </strong>';
      }
      rows++;
   });

   if (!rows) {
      document.getElementById('pinned-quotes').style.display = 'none';
      document.getElementById('title-pin').innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
   }
});

$(document).on('click', '.remove', function() {
   $(this).closest('tr').remove();
   rows--;
   if (!rows) {
      document.getElementById('pinned-quotes').style.display = 'none';
      document.getElementById('title-pin').innerHTML = '<strong style="color: #155724"> You have nothing on your pin list! </strong>'
   }
});