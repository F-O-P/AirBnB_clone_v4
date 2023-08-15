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
  requestAPIStatus('http://7d2e6eb84f44.654b0ff2.hbtn-cod.io:5001/api/v1/status/');
  placesSearch('http://7d2e6eb84f44.654b0ff2.hbtn-cod.io:5001/api/v1/places_search/');

  function requestAPIStatus (url) {
    $.get(url, function (data, status) {
      if (status === 'success') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
  }

  function placesSearch (url) {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: '{}',
      success: function (data) {
        for (const place of data) {
          const html = `<article>
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
          $('section.places').append(html);
        }
      }
    });
  }
