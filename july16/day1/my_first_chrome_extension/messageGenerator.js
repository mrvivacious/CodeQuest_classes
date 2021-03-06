// When the page is loaded, generate a random message
$(document).ready(function() {
  generateMessage();
});

// Generates random messages
function generateMessage() {
  let messages = [
    "The best way to start doing something is to start doing it.",
    "A period of consistent failure does not necessarily mean that success will never be seen.",
    "If you're always learning, when are you applying?",
    "When you aren't feeling your best, you are prone to fall for the worst",
    "The way you see yourself is not the way others see you...and the way others see you isn't" +
                    " necessarily who you really are.",
    "Commitments and responsibilities cease, but knowledge and love are eternal.",
    "Live and let live. Don't let the lives of others inhibit you from living yours.",
    "Don't hold others to your personal standards, and don't hold yourself to the standards " +
                    "of others.",
    "Never let a desire grow strong enough that you begin questioning yourself.",
    "Acquired pleasures should only supplement an already joyful life.",
    "Moving can sometimes be better than standing still, but it's always good to be engaged.",
    "Your life is, after all, only yours. Do exactly what you want.",
    "When there are no pending duties or present responsibilities, you become as free " +
                    "as free can be.",
    "Others may be engaging in certain activities. Others may have varying levels of success. " +
                    "Step out of your comfort zone when appropriate, but stay true to yourself.",
    "When you truly understand, you can begin to love. When you don't understand, you might suffer.",
    "Life doesn't have to be about being the best, or being a step ahead of everyone. Life, rather, " +
                    "can be about living how you want, making the efforts necessary to bring yourself what " +
                    "you really want, developing yourself however you want. It's your life, and your life is only " +
                    "whatever you make of it.",
    "If something requires your best, and you approach that something with anything less than your best, " +
                    "any outcome becomes fair.",
    "When you have nothing left to do, you can improve yourself, enjoy yourself, or both.",
    "Live in a way that you can respect.",
    "What are your best interests? Who knows them? Who has them in mind?",
    "One success is greater and more significant than any number of failures.",
    "One cannot be proficient in everything. Just develop yourself the way you want, with the " +
                    "skills you want.",
    "When you think about something, you dedicate your resources to that something. Would you " +
                    "rather dedicate your resources to what others are up to, or what you are up to?",
    "When you stop living for yourself, your development stops as well.",
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

  // Selecting a Magical Message
  let messageIndex = Math.floor(Math.random() * messages.length);
  let randomMessage = messages[messageIndex];
  // Debuggin purposes
  // alert(randomMessage);

  document.getElementById('msg').innerHTML = randomMessage;
}

// // Time: 1 min 3 seconds
// var dq = [
//   3096624446, 3094545850, 3098276432
// ];

// Worst case -- time spent setting up script
// Average case -- few seconds
// 30966244463094545850

// 8 seconds
