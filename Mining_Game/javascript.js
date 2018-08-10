// Mining game using localStorage
// CodeQuest 2018
// @author Vivek Bhookya

// Some handy vars to save us some typing space, time, and energy
var b_mine = document.getElementById('BUTTON_mine');
var b_donate = document.getElementById('BUTTON_donate');
var b_reset = document.getElementById('BUTTON_reset');

var currentOre = document.getElementById('CURRENT_ORE');
var specialOre = document.getElementById('CURRENT_SPECIAL');
var donatedOre = document.getElementById('DONATED_ORE');

// init() will update the ore values from localStorage according to what is saved if the values exist
// If the values do not exist, init() will create the values in localStorage and set them to zero (new game, blank values)
init();

// Properly handle localStorage setup on first open (brand new game)
// As these values won't be set in storage on the first time someone plays
//  this game, we must first add the values we want to modify to storage in order
//  to use them properly later
// If the value exists, the if() conditionals will be 'true'
// If the value does NOT exist, the localStorage.getItem() function will return null:
//  null can be treated the same as 'false' and so the else will evaluate
function init() {
  if (localStorage.getItem('SAVED_ORE')) {
    currentOre.innerHTML = localStorage.getItem('SAVED_ORE');
  }
  else {
    localStorage.setItem('SAVED_ORE', 0);
    currentOre.innerHTML = 0;
  }

  if (localStorage.getItem('SAVED_SPECIAL')) {
    specialOre.innerHTML = localStorage.getItem('SAVED_SPECIAL');
  }
  else {
    localStorage.setItem('SAVED_SPECIAL', 0);
    specialOre.innerHTML = 0;
  }

  if (localStorage.getItem('SAVED_DONATED')) {
    donatedOre.innerHTML = localStorage.getItem('SAVED_DONATED');
  }
  else {
    localStorage.setItem('SAVED_DONATED', 0);
    donatedOre.innerHTML = 0;
  }
}

// Mine
b_mine.onclick = function() {
  // Get current amount of ore mined,
  var savedOre;
  savedOre = localStorage.getItem('SAVED_ORE');

  // Increment the value of ore mined appropriately and then save the value
  // 10% chance of mining a special ore
  if ( Math.floor(Math.random() * 100) % 10 === 0 ) {
    var specOre = parseInt(localStorage.getItem('SAVED_SPECIAL'));
    specOre++;

    localStorage.setItem('SAVED_SPECIAL', specOre);
    specialOre.innerHTML = specOre;
    alert('SPECIAL!');
  }
  // Just mined regular ore, still nice
  else {
    savedOre++;
    localStorage.setItem('SAVED_ORE', savedOre);
    currentOre.innerHTML = savedOre;
  }

};

// Donate
b_donate.onclick = function() {
  // Get the amount donated already,
  var savedDonated;
  savedDonated = parseInt(localStorage.getItem('SAVED_DONATED'));

  // Get the amount saved as current ore AKA what is to be donated,
  var savedOre;
  savedOre = parseInt(currentOre.innerHTML);

  // Sum the two values, donate the value, and save the value
  var newDonatedOre = savedDonated + savedOre;

  localStorage.setItem('SAVED_DONATED', newDonatedOre);
  localStorage.setItem('SAVED_ORE', 0);

  currentOre.innerHTML = 0;
  donatedOre.innerHTML = newDonatedOre;
}

// Reset everything to zero
b_reset.onclick = function() {
  currentOre.innerHTML = 0;
  specialOre.innerHTML = 0;
  donatedOre.innerHTML = 0;

  localStorage.setItem('SAVED_ORE', 0);
  localStorage.setItem('SAVED_SPECIAL', 0);
  localStorage.setItem('SAVED_DONATED', 0);
}
