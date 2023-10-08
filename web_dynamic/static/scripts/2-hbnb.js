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
