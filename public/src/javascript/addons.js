$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).on('change', '.custom-file-input', function (event) {
    $(this).next('.custom-file-label').html(event.target.files[0].name);
});