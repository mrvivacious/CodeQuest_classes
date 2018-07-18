// Scrapes weather conditions from Google search query page
// FETCH HTML > SEARCH FOR DESIRED DATA > CLEAN UP RETRIEVED DATA > DISPLAY RESULT
// FETCH, SEARCH, CLEAN, DISPLAY

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
    // callback, do search(data)
    search(dataReturnedFromServer);
  });

}

// Function search()
// Parse the HTML for the info we desire (in this case, the weather condition)
// @param data The HTML of the page to search through
function search(data) {
  // console.log('WEATHER: ' +  data );
  // This approach failed....
  // let data = $(response).find('.lqhpac span');

  //  ....so we tried string manipulation
  // SEARCH AND CLEAN
  // let condition = data.split('wob_dc')[4].split('">')[1].split('</span>')[0];

  // Lololol just split left and right
  let condition = data.split('vk_gy vk_sh" id="wob_dc">')[1].split('<')[0];
  // console.log( condition );

  // DISPLAY
  document.getElementById('condition').innerHTML = condition;
}
