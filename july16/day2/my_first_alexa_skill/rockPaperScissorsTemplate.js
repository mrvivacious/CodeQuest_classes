/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

/**
 * This skill shares facts about various American holidays
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            CHRISTMAS_FACTS: [
                'Christmas celebrates the birth of Jesus Christ',
                'Christmas is celebrated on the twenty fifth of December',
                'The real name for Christmas trees is evergreen conifer',
                'Christmas is also referred to as x mess',
                'White Christmas is the best selling Christmas song',
                'The tallest snowman ever built was 122 ft tall',
                'Many businesses profit greatly around Christmas time',
                'There are over ninety Christmas themed movies'
            ],
            HALLOWEEN_FACTS: [
                'Halloween is celebrated on the thirty first of October',
                'There are over eighty thousand horror movies',
                'The largest pumpkin ever weighed over two thousand six hundred pounds',
                'Halloween is an abbreviation for All Hallows eve',
                'It is believed that Halloween has been around for six thousand years',
                'A fear of Halloween is called samhainophobia',
                'The most common colors seen during Halloween are orange and black',
                'New York City has an annual Halloween parade that receives over two million spectators',
                'According to myth, if you wear your clothes inside out on Halloween, you will see a witch at midnight'
            ],
            THANKSGIVING_FACTS: [
                'About fifty million turkeys are cooked for Thanksgiving every year',
                'Thanksgiving is celebrated on the fourth Thursday of November',
                'The day after Thanksgiving is known as Black Friday, a day where many businesses have great deals',
                'Only male turkeys make the gobble sound',
                'The Friday after Thanksgiving is known as the busiest day of the year for plumbers',
                'No turkey was served at the first Thanksgiving! Instead, there was seal, deer, lobster, duck, and other various foods',
                'Wild turkeys can run up to twenty miles per hour',
                'The average Thanksgiving turkey weighs around fifteen pounds',
                'Female turkeys are called hens'
            ],
            EASTER_FACTS: [
                'Easter celebrates the rebirth of Jesus Christ',
                'The first easter egg baskets looked like birds nests',
                'The white house holds an annual easter egg hunt',
                'One of the biggest easter eggs weighed over fifteen thousand pounds',
                'Wearing brand new clothes on easter is said to bring good luck for the next year',
                'The practice of painting eggs originated in Ukraine',
                'Easter is the second biggest candy-consuming holiday, first being Halloween',
                'Florida holds the largest easter egg hunt in the United States',
                'Easter is celebrated on a different day every year'
            ],
            VALENTINE_FACTS: [
                'Valentines day is celebrated on the fourteenth of February',
                'Groundhog day used to take place on February fourteenth',
                'Nearly two hundred million roses are sold every year on Valentines day',
                'A town in Texas is called Valentine',
                'The candy hearts with cute messages have a shelf life of five years', //fact 5
                'A mean message sent on Valentines day is called a vinegar Valentine',
                'Around one hundred fifty million valentines are sent every year',
                'About fifteen percent of men and women send themselves Valentines',
                'A Valentine is a message or note that is written with love'
            ],
            SKILL_NAME: 'Holiday Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a Halloween fact, for example. Or, you can say stop... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.response.speak("Hello, welcome to Holiday Facts. I have facts about " +
        "valentine's day, easter, halloween, christmas and thanksgiving. " + 
        "What holiday would you like to hear a fact for?").listen("Tell me the name of the holiday followed by the word facts.");
        this.emit(':responseReady');
    },

    'myHolidayFact': function() {
      var holiday = this.event.request.intent.slots.Holidays.value;

      if (holiday == "Valentine's day" || holiday == "valentine's day") {
        // Get a random Valentine's day fact
        // Use this.t() to get corresponding language data
        const factArr = this.t('VALENTINE_FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
      }

      else if (holiday == "Easter") {
        // Get a random Easter fact
        // Use this.t() to get corresponding language data
        const factArr = this.t('EASTER_FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
      }

      else if (holiday == "Christmas" || holiday == "xmas") {
        // Get a random Christmas fact
        // Use this.t() to get corresponding language data
        const factArr = this.t('CHRISTMAS_FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
      }
      
      else if (holiday == "thanksgiving" || holiday == "Thanksgiving" || holiday == "thanks giving" ||
       holiday == "things giving") {
        // Get a random Thanksgiving fact
        // Use this.t() to get corresponding language data
        const factArr = this.t('THANKSGIVING_FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        
        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
      }

      else if (holiday == "Halloween") {
        // Get a random Halloween fact
        // Use this.t() to get corresponding language data
        const factArr = this.t('HALLOWEEN_FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
      }
      
      else {
        this.response.speak("Sorry, I can't help you with that. I only have facts for valentine's day, easter, halloween, christmas and thanksgiving. ").listen("Tell me what holiday you want facts for, or say stop to stop.");
      }

      this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        this.response.speak('HELP_MESSAGE').listen('HELP_REPROMPT');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
