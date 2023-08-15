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
  
  function getPlaces (url) {
    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(amenityDict) }),
      contentType: 'application/json',
      success: function (data) {
        $('section.places').empty();
        $('section.places').append('<h1>Places</h1>');
        for (const place of data) {
            $.get(`http://7d2e6eb84f44.654b0ff2.hbtn-cod.io:5001/api/v1/places/${place.id}/reviews`, (data) => {
          const template = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`;
          $('section.places').append(template);
        }
      }
    });
  }
  