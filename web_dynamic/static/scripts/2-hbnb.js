$(document).ready(function () {
  const amenityDict = {};

  function updateAPIStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
  }

updateAPIStatus();

  $('input[type=checkbox]').click(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  }
  );
});
