'use strict';
const Alexa = require('alexa-sdk');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Rock paper scissors';
const DIALOG_MOVE_PROMPT = "Suh, what move do you make?";
const HELP_MESSAGE = 'Just say rock, paper, or scissors!';
const HELP_REPROMPT = 'Hi! Please say rock, paper, or scissors!';
const STOP_MESSAGE = 'Goodbye!';

const MOVES = [
    'rock',
    'paper',
    'scissors'
];

const handlers = {
    'LaunchRequest': function () {
      // On skill launch, ask user what move s/he wants to make
      // .listen() -- reprompt user
        this.emit(DIALOG_MOVE_PROMPT).listen(HELP_REPROMPT);
    },
    'MoveSubmitIntent': function () {
      // Replace 'move' with the name you used for your slot type
        let userMove = this.event.request.intent.slots.move.value;

        let randomIndex = Math.floor(Math.random() * MOVES.length);
        let randomMove = MOVES[randomIndex];
        let speechOutput =  'I played ' + randomMove + ' against your ' + userMove;

        // TODO:: Implement game logic. For ex,
        // if userMove === scissors and alexaMove === rock, add a "you lose" dialog to the speech output

        this.response.cardRenderer(SKILL_NAME, speechOutput);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

