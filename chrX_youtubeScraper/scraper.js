// We will build a little extension that displays video info from mine/your fav youtuber
// In this case, In Love With a Ghost
// Using HTML/CSS/JS/jQuery

// 1. Get the HTML of the YT artist's page
// 2. Parse the HTML for desired info
// 3. Display the info in our popup
// 4. When clicking a video title, let's open a new tab with the video itself

$(document).ready( function () {
  let url = 'https://www.youtube.com/channel/UCSCIeZFgWF5ZNmvNVG16WHQ/videos?sort=dd&view=0&flow=grid';

  // If you do not want to use jQuery for whatever reason, $.get() can be replaced
  //  with "Vanilla JS"'s XMLHttpRequest function
  // 1. jQuery's .get() will retrieve the HTML data of the url sent in
  $.get(url, function(response) {
    // console.log('The returned data:');
    // console.log(response);
    clean(response);
  });
});

// 4. When clicking a video title, let's open a new tab with the video itself
$(document).on('click', 'li', function () {
  window.open('https://youtube.com' + this.id);
});

// 2. Parse the HTML for desired info
function clean(data) {
  let titles = data.split('"label":"');
  // console.log(titles);

  // Due to the way the titles were split, we find that the video titles are at
  //  every fifth index of the returned array, starting from index 1
  // Hence, i = 1, i+=5
  for (let i = 1; titles[i] !== undefined; i+=5) {
    // console.log(titles[i]);
    let title = titles[i].split(' by In Love With A Ghost ')[0];
    let url = titles[i].split('{"url":"')[1].split('","')[0];
    let idxOfSlash = url.indexOf('\\'); // Double \\ because \ is an escape character and we don't want the ' to escape

    // If the character isn't found, indexOf() returns -1. substring() from 0 to -1 clears the string...so we check the existence
    //  of the character to make sure we don't accidentally get rid of the wrong strings
    if (idxOfSlash > 0) {
      url = url.substring(0, idxOfSlash);
    }

    if ( !(title.includes('Sort by') || title.includes('Create a video')) ) {
      // console.log(title);
      // console.log(url);

      displayInfo(title, url);
    }
  }
}

// 3. Display the info in our popup
function displayInfo(title, url) {
  // "Declare" a li object
  let li = document.createElement("li");

  let t = '';
  t = document.createTextNode(title);
  li.appendChild(t);

  li.id = url;
  li.Class = 'VIDEO';
  document.getElementById("videos").appendChild(li);
}

// Good luck
// Thank you for your time
