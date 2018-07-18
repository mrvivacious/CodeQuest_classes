$(document).ready(function() {
   fb();
   weather();

   // $('#submitName').click(saveName);
});

// Function scrape()
// Constructs full url and does JQuery $.get() to retrieve the url's DOM
// @param idx Index to collect state and abbr of
// @param search The search query of the desired organization
function fb() {
  let fb = 'https://www.facebook.com/';

  // Thank you, http://api.jquery.com/jQuery.get/
  $.get(fb, function(fbResponse) {
    // [n] indicates the element of the split array with the desired value
    let fbParse = fbResponse.split('title')[9].split('>')[1].split('<')[0];
    // console.log( fbParse );

    document.getElementById('notifications').innerHTML = fbParse + ' notifications';
  });
}

// 29 seconds -> 2 seconds
function weather() {
  let weather = 'https://www.google.com/search?q=weather';

  $.get(weather, function(weatherResponse) {
    let weatherParse = weatherResponse.split('m" style="display:inline">')[1].split('</span><span c')[0];
    document.getElementById('weather').innerHTML = weatherParse;
  });
}

// function init() {
//   //todo
// }
//
// function saveName() {
//   let name = document.getElementById('INPUT_name').value.trim();
//   chrome.storage.sync.set({ 'name':[name] }, function() {});
// }
