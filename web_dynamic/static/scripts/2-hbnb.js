$(document).ready(function () {
  const amenityDict = {};

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
function updateAPIStatus () {
  $.get('http://7d2e6eb84f44.654b0ff2.hbtn-cod.io:5001/api/v1/status/',  (data) => {
    // $('div#api_status').append('<div>start</div>');
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
      // $('div#api_status').append('<div>good</div>');
    } else {
      $('div#api_status').removeClass('available');
      // $('div#api_status').append('<div>bad</div>');
    }
  });
}
