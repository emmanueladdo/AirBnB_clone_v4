$(document).ready(() => {
  // Initialize an empty array to store selected amenity IDs and names
  const selectedAmenities = [];

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      // If the checkbox is checked, add the Amenity ID and name to the selectedAmenities array
      selectedAmenities.push({ id: amenityId, name: amenityName });
    } else {
      // If the checkbox is unchecked, remove the Amenity ID and name from the selectedAmenities array
      const index = selectedAmenities.findIndex(amenity => amenity.id === amenityId);
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    // Update the h4 tag inside the div with the list of selected Amenities
    const amenitiesList = selectedAmenities.map(amenity => amenity.name).join(', ');

    $('.amenities h4').text('Selected Amenities: ' + amenitiesList);
  });
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  success: (status) => {
    if (status.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  }
});

// Function to create and populate place articles
function createPlaceArticle (place) {
  const article = $('<article>');
  article.html(`
      <!-- Populate the article content with place information -->
      <h2>${place.name}</h2>
      <p>${place.description}</p>
      <!-- You can include other place information as needed -->
    `);
  return article;
}

// Make an AJAX request to fetch places and display them
$('button').click(function () {
  // Make an AJAX POST request to places_search with the list of selected amenities
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ amenities: selectedAmenities.map((amenity) => amenity.id) }),
    success: (places) => {
      const placesSection = $('.places');

      // Clear the existing content
      placesSection.empty();

      // Loop through the results and create article tags
      places.forEach((place) => {
        const article = createPlaceArticle(place);
        placesSection.append(article);
      });
    },
    error: (error) => {
      console.error('Error loading places:', error);
    }
  });
});
