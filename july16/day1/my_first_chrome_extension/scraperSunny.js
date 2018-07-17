// √ How do we get the html of the url?
// How do we get the data we want?
$(document).ready(function() {
  getURL();
});

// FETCH
function getURL() {
  // Made space for the weather search url
  let url = 'https://www.google.com/search?q=weather';

  $.get(url, function(dataReturnedFromServer) {
    search(dataReturnedFromServer);
  });
  // callback, do search(data)
}

function search(data) {
  // console.log('WEATHER: ' +  data );
  // This approach failed
  // let data = $(response).find('.lqhpac span');

  // SEARCH AND CLEAN
  let condition = data.split('wob_dc')[4].split('">')[1].split('</span>')[0];

  console.log( condition );

  // DISPLAY
  document.getElementById('condition').innerHTML = condition;
}
