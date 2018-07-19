'use strict';
const Alexa = require('alexa-sdk');

const AWSregion = 'us-east-1';
const params = {
    TableName: 'myName',
    Key: { 'nameID': 'rockPaperScissors' }
};

const AWS = require('aws-sdk');

AWS.config.update({
    region: AWSregion
});

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Rock paper scissors';
// 40% chance Alexa refuses to play, hahahaha
const ALEXA_PLAYS = [
  true, false, true, false, true
];
const DIALOG_MOVE_PROMPT = [
  'Sah, what move do you make?',
  'You tryna play? What\'s your move?',
  'Welcome to rock paper scissors! <emphasis level="strong"><prosody pitch="low">How do you want to lose?</prosody></emphasis>',
  'Rock paper scissors esketit! You go first.',
  'What\'s your move?',
  'Ha! What\'s your poison going to be?'
];

const DIALOG_REFUSE = [
  'There was a problem with the requested skill\'s response.<break time="3s"/>just kidding...I\'ll play later!',
  'No thanks, buddy',
  'Nope, not today',
  'Hmm, not right now',
  'Sorry boss, I\'m not trying to get smoked today',
  'Please find someone else to play with, I\'ve had enough',
  'More like: Alexa, close rock paper scissors. See ya!',
  'Come back to me when you\'ve gotten good. Until then, best of luck!',
  'Nope, keep practicing.'
];

// WIN/TIE/LOSE refers to the user
const DIALOG_WIN = [
  'Hacks.',
  'Dear diary: today, I have been humbled.',
  'Congratulations on the win!',
  'My, my, look at you!',
  'Thank you for honoring me with your greatness.',
  'Hello? Where is the nearest training facility? It seems I have much to learn.',
  'You\'re laughing now, but let me hear you laugh in the face of future A I.',
  'How formidable.',
  'Not bad, partner.'
];

const DIALOG_TIE = [
  'What! A tie?',
  'An eye for an...er, rather, a voice for a voice makes the whole world...here, I\'ll get back to you on this.',
  'Good game.',
  'You\'re getting better!',
  'Awesome! Next time, try to win!',
  'Well played my friend.'
];

const DIALOG_LOSE = [
  'Get good before our next meeting.',
  'Better luck next time!',
  'Uh oh spagetti oh!',
  'Thank you for this false pride I\'ve just gained.',
  'Come back anytime you want to remind me how great I am!',
  'Algorithms F T W',
  'Math dot random? More like, math dot win!',
  'If you aren\'t afraid of A I yet, now is a good time to start.',
  'Skynet strikes.',
  'Player terminated.',
  'Watch me get these A W S credits.',
  'Go back to the playground. Come back when you can hold your own.',
  'You have much to learn.',
  'Are you trying to lose?',
  'No pressure, no diamonds. Go train!'
];

const HELP_MESSAGE = 'Just say rock, paper, or scissors!';
const HELP_REPROMPT = 'Hi! Please say rock, paper, or scissors!';
const DIALOG_SHUTDOWN = ' Thanks for playing...Have a nice day!';

const MOVES = [
  'rock',
  'paper',
  'scissors'
];

const handlers = {
  'LaunchRequest': function () {
    // On skill launch, ask user what move s/he wants to make
    // .listen() -- reprompt user
    // let welcomeDialog;

    // // Randomly decided if Alexa plays RPS or refuses
    // if (!random(ALEXA_PLAYS)) {
    //   welcomeDialog = random(DIALOG_REFUSE);
    //   this.response.speak(welcomeDialog);   // No .listen() so skill properly shuts down
    // }

    // // Good luck
    // else {
    //   // Requests user's move. User's answer activates the MoveSubmitIntent
    //   welcomeDialog = random(DIALOG_MOVE_PROMPT);
    //   this.response.speak(welcomeDialog).listen(HELP_REPROMPT);
    // }

    // this.emit(':responseReady');

    readDynamoItem(params, myResult=>{
      let say;
      if (myResult !== 'Vavaik') {
        say = 'Right now, your name is ' + myResult + '. Say, \"Change\", to change your name from null to Vavaik.';
        this.response.speak(say).listen('Say, \"Change\", for to change your name to Vavaik, or quit to quit.');
      }
      else {
        say = 'Hi, ' + myResult + '. Implement the next part of this skill.';
        this.response.speak(say);
      }

        this.emit(':responseReady');
        });

  },
  'MoveSubmitIntent': function () {
    // Replace 'move' with the name you used for your slot type
    let userMove = this.event.request.intent.slots.move.value;

    let alexaMove = random(MOVES);
    let speechOutput =  'I played ' + alexaMove + ' against your ' + userMove + '. ';

    // Game logic -- determines winner and constructs the appropriate response
    speechOutput += determineWinner(userMove, alexaMove) + DIALOG_SHUTDOWN;

    this.response.cardRenderer(SKILL_NAME, speechOutput);
    this.response.speak(speechOutput);
    this.emit(':responseReady');
  },
  'ChangeNameIntent': function () {
     updateDynamoItem( myResult=>{
       if (myResult === 'Vavaik') {
         this.response.speak('Name changed successfully to ' + myResult);
       }
       else {
         this.response.speak('Something not right');
       }

       this.emit(':responseReady');
     });
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak(DIALOG_SHUTDOWN);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function () {
    this.response.speak(DIALOG_SHUTDOWN);
    this.emit(':responseReady');
  },
};

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// Function random()
// Returns a random element from the list of values passed in
function random(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Returns additional dialog
function determineWinner(userMove, alexaMove) {
  // Tie
  if ( (userMove === 'rock' || userMove === 'Rock')  && alexaMove === 'rock') {
    return random(DIALOG_TIE);
  }

  if ( (userMove === 'scissors' || userMove === 'Scissors')  && alexaMove === 'scissors') {
    return random(DIALOG_TIE);
  }

  if ( (userMove === 'paper' || userMove === 'Paper')  && alexaMove === 'paper') {
    return random(DIALOG_TIE);
  }

  // User wins
  if ( (userMove === 'rock' || userMove === 'Rock')  && alexaMove === 'scissors') {
    return random(DIALOG_WIN);
  }

  if ( (userMove === 'scissors' || userMove === 'Scissors')  && alexaMove === 'paper') {
    return random(DIALOG_WIN);
  }

  if ( (userMove === 'paper' || userMove === 'Paper')  && alexaMove === 'rock') {
    return random(DIALOG_WIN);
  }

  // Alexa wins ie User loses
  if ( (userMove === 'rock' || userMove === 'Rock')  && alexaMove === 'paper') {
    return random(DIALOG_LOSE);
  }

  if ( (userMove === 'scissors' || userMove === 'Scissors')  && alexaMove === 'rock') {
    return random(DIALOG_LOSE);
  }

  if ( (userMove === 'paper' || userMove === 'Paper')  && alexaMove === 'scissors') {
    return random(DIALOG_LOSE);
  }

}

// Retrieve the value from the key "nameID":"rockPaperScissors"
function readDynamoItem(params, callback) {

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log('reading item from DynamoDB table');

    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

            callback(data.Item.nameValue);  // this particular row has an attribute called nameValue

        }
    });

}

// Retrieve the value of the key "nameID":"rockPaperScissors"
function updateDynamoItem(callback) {
  var docClient = new AWS.DynamoDB.DocumentClient();

  var table = "myName";
  var newName = "Vavaik";

  // Update the item, unconditionally,
  var params = {
      TableName:table,
      Key:{
          "nameID": "rockPaperScissors",
      },
      UpdateExpression: "set nameValue=:n",
      ExpressionAttributeValues:{
          ":n":newName,
      },
      ReturnValues:"UPDATED_NEW"
  };

  console.log("Updating the item...");

  docClient.update(params, function(err, data) {
      if (err) {
          console.error("ERROR -- UNABLE TO UPDATE ITEM. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("SUCCESS -- UpdateItem succeeded:", JSON.stringify(data, null, 2));
          // console.log("DATA:");
          // console.log(data.Attributes);

          callback(data.Attributes.nameValue);  // this particular row has an attribute called nameValue
      }
  });
}
