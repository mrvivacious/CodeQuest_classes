// Javascript syntax
var blah = "Hi Pranav!";
// function name() == declares the function
function surprise() {
  // When surprise is called, this is the
  //  computer's job
  alert(blah);
}

function magicalMessages() {
  let messages = [
    "You are a wonderful person.",
    "You are very beautiful today.",
    "You should smile more. You have a wonderful smile.",
    "You are loved.",
    "People in this world appreciate you, just the way you are.",
    "Have a wonderful day!",
    "I know there are great things in store for you.",
    "You add value to all the lives you touch.",
    "You look lovely today.",
    "You are a champion.",
    "You are awesome.",
    "You inspire many.",
    "You are a meaningful and special individual.",
    "Don't forget to smile, you are beautiful!",
    "You did a good job today.",
    "You are a role model and a great friend."
  ];

  let numberOfMessages = messages.length;

  // Math.floor rounds the decimal value generated down to the closest int
  // "How does one access the 3.232423th message from a list?" so, Math.floor()
  let randomIndex = Math.floor(Math.random() * numberOfMessages);
  let ourMessage = messages[randomIndex];
  alert("Here's a message for you!\n" + ourMessage);
}

function randomCall() {
  let hangoutsURL = 'https://hangouts.google.com/?ht=0&hcb=0&lm1=1531104876192&hs=' +
  '79&hmv=1&ssc=WyIiLDAsbnVsbCxudWxsLG51bGwsW10sbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLDc5LG51bGwsbnVsbCxudWxsLFsxNTMxMTA0ODc2MTkyXSxudWxsLG51bGwsW1tudWxsLG51bGwsW251bGwsIisxMzA5NjYwMjM0MCJdXV0sbnVsbCxudWxsLHRydWUsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsW10sW10sbnVsbCxudWxsLG51bGwsW10sbnVsbCxudWxsLG51bGwsW10sbnVsbCxudWxsLFtdXQ..' +
  '&action=chat&pn=%2B';

  let phoneNumbers = [
   3098884990, 3094542491, 3098274646, 3094382770, 3094672777, 2179358833,
   3094442213, 8158426575, 3092632600, 3093832500, 3096821199, 2177323370,
   3092745780, 3096938686, 3093475596, 3096996832, 3096767676, 3096970447,
   3096828282, 2178751603,
   // End Pizza Hut
   3094545850, 3096624446, 3098276432,
   // End Dairy Queen
   3096618322, 3096642148, 3096868114, 2173564300, 8474381850, 8476585040
   // End Biaggi's
 ];

  let numberOfNumbers = phoneNumbers.length;
  let randomIndex = Math.floor(Math.random() * numberOfNumbers);
  let number = '1' + phoneNumbers[randomIndex];

  let url = hangoutsURL + number;
  openPopup(url);
}

// Helper function
function openPopup(urlToOpen) {
  // Not working for some reason
  // chrome.windows.getCurrent(null, function(tab) {
  //   // Open a window, but not a full window -- a popup with the url of the call
  //   chrome.windows.create(
  //     {url: urlToOpen, type: "popup"}
  //   );
  // });

  window.open(urlToOpen);
}
