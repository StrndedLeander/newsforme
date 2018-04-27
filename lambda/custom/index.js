const Alexa = require('ask-sdk-core');

const readArticleHandler={
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
          && request.intent.name === 'readArticle';
      },
      handle(handlerInput) {
          const speechtext;
        return handlerInput.responseBuilder
          .speak(speechtext)
          .reprompt(HELP_REPROMPT)
          .getResponse();
      },
}

const sendArticleHandler={
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
          && request.intent.name === 'sendArticle';
      },
      handle(handlerInput) {
          const speechtext;
        return handlerInput.responseBuilder
          .speak(speechtext)
          .reprompt(HELP_REPROMPT)
          .getResponse();
      },
}

const ignoreSourceHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
          && request.intent.name === 'ignoreSource';
      },
      handle(handlerInput) {
          const speechtext;
        return handlerInput.responseBuilder
          .speak(speechtext)
          .reprompt(HELP_REPROMPT)
          .getResponse();
      },
}

const searchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
          && request.intent.name === 'search';
      },
      handle(handlerInput) {
          const speechtext;
        return handlerInput.responseBuilder
          .speak(speechtext)
          .reprompt(HELP_REPROMPT)
          .getResponse();
      },
}

const skipArticleHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
          && request.intent.name === 'skipArticle';
      },
      handle(handlerInput) {
          const speechtext;
        return handlerInput.responseBuilder
          .speak(speechtext)
          .reprompt(HELP_REPROMPT)
          .getResponse();
      },
}

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Tut mir leid, da ist etwas schief gelaufen.')
      .reprompt('Da war wohl etwas nicht ganz richtig.')
      .getResponse();
  },
};

const SKILL_NAME = 'News for me';
const GREETING_MESSAGES = ["Hallo"];
const HELP_MESSAGES = ['Womit kannich dir helfen?'];
const HELP_REPROMPTS = ['Womit kannich dir helfen?'];
const STOP_MESSAGES = ['Goodbye!'];

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
.lambda();