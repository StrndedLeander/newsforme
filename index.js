"use strict";
/* This code has been generated from your interaction model by skillinator.io

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the contents as the code for a new Lambda function, using the alexa-skill-kit-sdk-factskill template.
// This code includes helper functions for compatibility with versions of the SDK prior to 1.0.9, which includes the dialog directives.



// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function
const fetch = require('node-fetch');
const baseURL = 'https://newsapi.org/v2/';
const newsApiKey ='&apiKey=f4dc49ec358a4b2db5b2182131c6aba9';

var articleURL = '';
var newsArray = [];
var newsIndex = 0;
let speechOutput;
let reprompt;
let welcomeOutput = "Willkommen bei Nachrichten für mich, deinem News Portal. Ich helfe dir interessante Nachrichten zu finden indem ich dir einen kurzen Überblick vorlese. Du sagst mir ob du mehr hören, den Artikel zugeschickt haben oder den nächsten hören willst. Wollen wir loslegen?";
let welcomeReprompt = "sample re-prompt text";
// 2. Skill Code =======================================================================================================
const Alexa = require('alexa-sdk');
const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).
speechOutput = '';
const handlers = {
  'LaunchRequest': function () {
    // Index mitgeben
    this.attributes['currentArticleIndex'] = 0;

    this.emit(':ask', welcomeOutput, welcomeReprompt);
  },
  'AMAZON.HelpIntent': function () {
    speechOutput = 'Placeholder response for AMAZON.HelpIntent.';
    reprompt = '';
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    speechOutput = 'Placeholder response for AMAZON.CancelIntent';
    this.emit(':tell', speechOutput);
  },
  'AMAZON.StopIntent': function () {
    speechOutput = 'Placeholder response for AMAZON.StopIntent.';
    this.emit(':tell', speechOutput);
  },
  'SessionEndedRequest': function () {
    speechOutput = '';
    //this.emit(':saveState', true);//uncomment to save attributes to db on session end
    this.emit(':tell', speechOutput);
  },
  'skipArticle': function () {
    speechOutput = '';

    // aktuellen Index aus Session Attributen holen
    let index = this.attributes['currentArticleIndex'];
    // Session Index für nächsten Aufruf iterieren
    this.attributes['currentArticleIndex'] = index++;


    //any intent slot variables are listed here for convenience


    //Your custom intent handling goes here
    newsIndex++;
    speechOutput = "Ok, hier der nächste Artikel: SKIP ARTICLE";
    this.emit(":ask", speechOutput, speechOutput);
  },
  'searchKeyword': function () {
    speechOutput = '';

    //any intent slot variables are listed here for convenience

    let querySlotRaw = this.event.request.intent.slots.query.value;
    console.log(querySlotRaw);
    let querySlot = resolveCanonical(this.event.request.intent.slots.query);
    console.log(querySlot);

    //Your custom intent handling goes here
    var url = baseURL + 'everything?language=de&q='+querySlot+newsApiKey;
    jsonCall(url);

    speechOutput = "Nachrichten von:"+ newsArray.articles[newsIndex].source.name+"."+newsArray.articles[newsIndex].description;

    this.emit(":ask", speechOutput, speechOutput);
  },
  'searchCategory': function () {
    speechOutput = '';

    //any intent slot variables are listed here for convenience

    let categorySlotRaw = this.event.request.intent.slots.category.value;
    console.log(categorySlotRaw);
    let categorySlot = resolveCanonical(this.event.request.intent.slots.category);
    console.log(categorySlot);

    //Your custom intent handling goes here
    newsIndex=0;
    var url = baseURL + 'everything?language=de&category='+categorySlot+newsApiKey;
    jsonCall(url);

    speechOutput = "Nachrichten von:"+ newsArray.articles[newsIndex].source.name+"."+newsArray.articles[newsIndex].description;
    this.emit(":ask", speechOutput, speechOutput);
  },
  'ignoreSource': function () {
    speechOutput = '';

    //any intent slot variables are listed here for convenience

    let sourceSlotRaw = this.event.request.intent.slots.source.value;
    console.log(sourceSlotRaw);
    let sourceSlot = resolveCanonical(this.event.request.intent.slots.source);
    console.log(sourceSlot);

    //Your custom intent handling goes here
    newsIndex=0;
    while (newsArray.articles[newsIndex].source.name == sourceSlot){
      newsIndex++;
    }
    speechOutput = "Ok, von " + sourceSlotRaw + " von Bild zeige ich dir nichts mehr. Sag mir wenn du weitere Artikel hören willst.";
    this.emit(":ask", speechOutput, speechOutput);
  },
  'sendArticle': function () {
    speechOutput = '';

    //any intent slot variables are listed here for convenience


    //Your custom intent handling goes here
    speechOutput = "Ok, ich habe dir den Artiel auf dein Smartphone geschickt. Sag mir wenn du weitere Artikel hören willst.";
    this.emit(":ask", speechOutput, speechOutput);
  },
  'readWholeArticle': function () {
    speechOutput = 'Hier ist der gesamte Artikel';

    //any intent slot variables are listed here for convenience

    //Your custom intent handling goes here

    speechOutput = "Ok, ich lese dir den ganzen Artikel vor. Ob sich die SPD mit Andrea Nahles erneuert? Linksparteichef Riexinger bezweifelt das. Eine Option für ein Linksbündnis sieht er mit ihr nicht. Für die SPD läuft es nicht wirklich rund in diesen Tagen. Die neue SPD-Chefin Andrea Nahles soll ihre Partei aus der Misere führen. Nur wie? Nahles wurde mit einem denkbar mauen Ergebnis an die Parteispitze gewählt: Sie ist nun die 66-Prozent-Vorsitzende. Ausgerechnet zu einer Zeit, in der sie geforderter ist als jeder Parteichef vor ihr. Denn es geht um alles für die Partei. Jüngste Umfragen verheißen nichts Gutes. Die Wahl von Nahles zur neuen SPD-Vorsitzenden hat der Partei demnach in der Wählergunst bislang keinen klaren Vorteil verschafft. Wäre am nächsten Sonntag Bundestagswahl, bekäme die SPD laut dem ZDF-Politbarometer rund 20 Prozent der Stimmen - nur ein Prozentpunkt mehr als vor zwei Wochen. Damit rückt auch ein mögliches Linksbündnis als Alternative zur Großen Koalition in weite Ferne. Für die Führung der Linkspartei ist Rot-Rot-Grün im Bund ohnehin derzeit keine Option. Vor allem, wie Parteichef Bernd Riexinger sagte, wegen des politischen Kurses den Nahles und der SPD-Vizekanzler und Finanzminister Olaf Scholz eingeschlagen haben. Zum Wirtschafts Club Die SPD muss sich entscheiden, ob sie eine wirkliche Erneuerung will, oder ob sie weiterhin Vize-Kanzlerwahlverein mit Unionsanbindung trotz der katastrophalen Wahlergebnisse bleiben will“, sagte Riexinger dem Handelsblatt. Aber eine wirkliche Erneuerung der Sozialdemokraten, die diese Bezeichnung auch verdiente, hieße vor allem, wieder Kurs auf soziale Gerechtigkeit zu nehmen. „Doch das ist aufgrund von noch über drei Jahren Mini-Groko, dem Koalitionsvertrag und den bisherigen Aussagen von Scholz und Nahles kaum zu erwarten, betonte der Linken-Chef. Stefan Liebich vom Reformerflügel der Linkspartei ist weniger pessimistisch. Ein Mitte-Links-Bündnis ist die beste Chance auf einen Richtungswechsel in unserem Land. Viele, auch in der Sozialdemokratie, wollen einen solchen Wechsel, sagte der Bundestagsabgeordnete dem Handelsblatt. Ich hoffe sehr, dass Andrea Nahles dies ernsthaft mit den Spitzen der Linken und der Grünen sondiert und eine Vorbereitung auch auf Fachebene befördert.Nahles hat ihrer Partei einen großen Erneuerungsprozess versprochen, parallel zur Regierungsarbeit. Als Vorsitzende der Bundestagsfraktion ist sie bewusst nicht ins Kabinett eingetreten, um an der Spitze von Partei und Fraktion das SPD-Profil zu schärfen. Laut Politbarometer rechnet aber sowohl innerhalb als auch außerhalb der Partei nicht einmal jeder zweite damit, dass Nahles die SPD auf Erfolgskurs bringen wird. Das sind die größten Baustellen der SPD: Diaspora! In Ostdeutschland liegt die SPD in vielen Regionen hinter der AfD, in Baden-Württemberg bei zwölf Prozent, in Bayern ist es nicht viel mehr. Ganze Landstriche drohen zur SPD-freien Zone zu werden, es wird immer schwerer, Mandatsträger zu finden. So müssen zum Beispiel in Thüringen externe Dienstleister eingekauft werden, um Wahlplakate aufzuhängen, da Mitglieder fehlen oder zu alt sind, um noch auf Leitern zu steigen. Der Parteilinke Matthias Miersch hält SPD-Bürgerbusse für eine Option, um auf dem Land stärker präsent zu sein - die SPD müsse wieder Kümmererpartei werden. Quelle: dpa Ein Grund könnte sein, dass sie sich nicht gegen die eigenen Minister positionieren kann. Deshalb bleibt Nahles auch nichts anderes übrig, als auf dem Prinzip der schwarzen Null zu beharren - trotz der Kritik in der eigenen Partei. In guten Zeiten keine neuen Schulden zu machen ist ein Gebot der Vernunft, sagte Nahles dem Magazin Spiegel. Es sei unnötig, an dieser Stelle einen Konflikt zu beginnen. Wir legen einen soliden Haushalt vor und investieren massiv – so geht gute Finanzpolitik.Nahles stärkte damit ihrem Parteikollegen und Finanzminister Scholz den Rücken, der sich bei der schwarzen Null in der Tradition seines Vorgängers Wolfgang Schäuble (CDU) sieht. Auf dem SPD-Parteitag in Wiesbaden hatten sich die Jusos gegen das Prinzip ausgesprochen, im Bund ohne neue Schulden auszukommen. Scholz will seine Haushaltspläne in der kommenden Woche dem Kabinett vorlegen.Linksparteichef Riexinger sieht in der Linksbündnis-Frage vor allem die SPD am Zug. Die Bedingungen dafür liegen für ihn auf der Hand. Ein Weiter so mit Alters- und Kinderarmut, Hartz IV-Elend, Steuergeschenken für Reiche und Unternehmen und prekärer Beschäftigung wird es mit der Linken sicher nicht geben, sagte er. Ähnlich sieht es Liebich. Man sei derzeit zwar weit von einer Bundestagsmehrheit entfernt. In allen drei Parteien gibt es aber Befürworter so einer Regierung und wenn wir gemeinsam mutig für eine andere Politik eintreten, die Armut bekämpft, steigende Löhne und Renten für die Mehrheit der Menschen ermöglicht und die sich nicht scheut, die Superreichen stärker zur Kasse zu bitten, kommen wir auch wieder in die Offensive, sagte er.„Es wäre schon viel erreicht, wenn erstmals die Tür für ernsthafte Gespräche geöffnet werden würde.Hoffnung macht Riexinger in dieser Hinsicht, dass Nahles bei der Wahl zur SPD-Vorsitzenden von nur zwei Drittel der Delegierten gewählt wurde. „Ich sehe das als Hinweis, dass Teile der Basis nicht mehr bereit sind, sich von der Parteiführung vorschreiben zu lassen, wer Vorsitzende wird, sagte er. Es gibt die SPD-Mitglieder, die Erneuerung ernst nehmen und wieder sozialdemokratische statt neoliberaler Politik machen wollen.";

    this.emit(":ask", speechOutput, speechOutput);
  },
  'quickReadArticle': async function () {
    speechOutput = '';

    //any intent slot variables are listed here for convenience


    //Your custom intent handling goes here
    newsIndex=0;
    var url = baseURL + 'top-headlines?language=de'+newsApiKey;
    await jsonCall(url);
    const article = newsArray.articles[newsIndex];
    const { source, description } = article;
    // console.log(newsArray)
    speechOutput = `Nachrichten von: ${source.name} - ${description}`;
    this.emit(":ask", speechOutput, speechOutput);
  },
  'Unhandled': function () {
    speechOutput = "The skill didn't quite understand what you wanted.  Do you want to try something else?";
    this.emit(':ask', speechOutput, speechOutput);
  }
};

async function jsonCall(url){
  const options={
    method: 'GET',
    headers:{
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
  }
  const response = await fetch(url)
    .then(response => { return response.json(); })
    .then(data=>newsArray=data)
    .catch(console.log);

    return await response;
}

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================



function resolveCanonical(slot) {
  //this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
  let canonical;
  try {
    canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
  } catch (err) {
    console.log(err.message);
    canonical = slot.value;
  };
  return canonical;
};

function delegateSlotCollection() {
  console.log("in delegateSlotCollection");
  console.log("current dialogState: " + this.event.request.dialogState);
  if (this.event.request.dialogState === "STARTED") {
    console.log("in Beginning");
    let updatedIntent = null;
    // updatedIntent=this.event.request.intent;
    //optionally pre-fill slots: update the intent object with slot values for which
    //you have defaults, then return Dialog.Delegate with this updated intent
    // in the updatedIntent property
    //this.emit(":delegate", updatedIntent); //uncomment this is using ASK SDK 1.0.9 or newer

    //this code is necessary if using ASK SDK versions prior to 1.0.9
    if (this.isOverridden()) {
      return;
    }
    this.handler.response = buildSpeechletResponse({
      sessionAttributes: this.attributes,
      directives: getDialogDirectives('Dialog.Delegate', updatedIntent, null),
      shouldEndSession: false
    });
    this.emit(':responseReady', updatedIntent);

  } else if (this.event.request.dialogState !== "COMPLETED") {
    console.log("in not completed");
    // return a Dialog.Delegate directive with no updatedIntent property.
    //this.emit(":delegate"); //uncomment this is using ASK SDK 1.0.9 or newer

    //this code necessary is using ASK SDK versions prior to 1.0.9
    if (this.isOverridden()) {
      return;
    }
    this.handler.response = buildSpeechletResponse({
      sessionAttributes: this.attributes,
      directives: getDialogDirectives('Dialog.Delegate', null, null),
      shouldEndSession: false
    });
    this.emit(':responseReady');

  } else {
    console.log("in completed");
    console.log("returning: " + JSON.stringify(this.event.request.intent));
    // Dialog is now complete and all required slots should be filled,
    // so call your normal intent handler.
    return this.event.request.intent;
  }
}


function randomPhrase(array) {
  // the argument is an array [] of words or phrases
  let i = 0;
  i = Math.floor(Math.random() * array.length);
  return (array[i]);
}

function isSlotValid(request, slotName) {
  let slot = request.intent.slots[slotName];
  //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
  let slotValue;

  //if we have a slot, get the text and store it into speechOutput
  if (slot && slot.value) {
    //we have a value in the slot
    slotValue = slot.value.toLowerCase();
    return slotValue;
  } else {
    //we didn't get a value in the slot.
    return false;
  }
}

//These functions are here to allow dialog directives to work with SDK versions prior to 1.0.9
//will be removed once Lambda templates are updated with the latest SDK

function createSpeechObject(optionsParam) {
  if (optionsParam && optionsParam.type === 'SSML') {
    return {
      type: optionsParam.type,
      ssml: optionsParam['speech']
    };
  } else {
    return {
      type: optionsParam.type || 'PlainText',
      text: optionsParam['speech'] || optionsParam
    };
  }
}

function buildSpeechletResponse(options) {
  let alexaResponse = {
    shouldEndSession: options.shouldEndSession
  };

  if (options.output) {
    alexaResponse.outputSpeech = createSpeechObject(options.output);
  }

  if (options.reprompt) {
    alexaResponse.reprompt = {
      outputSpeech: createSpeechObject(options.reprompt)
    };
  }

  if (options.directives) {
    alexaResponse.directives = options.directives;
  }

  if (options.cardTitle && options.cardContent) {
    alexaResponse.card = {
      type: 'Simple',
      title: options.cardTitle,
      content: options.cardContent
    };

    if (options.cardImage && (options.cardImage.smallImageUrl || options.cardImage.largeImageUrl)) {
      alexaResponse.card.type = 'Standard';
      alexaResponse.card['image'] = {};

      delete alexaResponse.card.content;
      alexaResponse.card.text = options.cardContent;

      if (options.cardImage.smallImageUrl) {
        alexaResponse.card.image['smallImageUrl'] = options.cardImage.smallImageUrl;
      }

      if (options.cardImage.largeImageUrl) {
        alexaResponse.card.image['largeImageUrl'] = options.cardImage.largeImageUrl;
      }
    }
  } else if (options.cardType === 'LinkAccount') {
    alexaResponse.card = {
      type: 'LinkAccount'
    };
  } else if (options.cardType === 'AskForPermissionsConsent') {
    alexaResponse.card = {
      type: 'AskForPermissionsConsent',
      permissions: options.permissions
    };
  }

  let returnResult = {
    version: '1.0',
    response: alexaResponse
  };

  if (options.sessionAttributes) {
    returnResult.sessionAttributes = options.sessionAttributes;
  }
  return returnResult;
}

function getDialogDirectives(dialogType, updatedIntent, slotName) {
  let directive = {
    type: dialogType
  };

  if (dialogType === 'Dialog.ElicitSlot') {
    directive.slotToElicit = slotName;
  } else if (dialogType === 'Dialog.ConfirmSlot') {
    directive.slotToConfirm = slotName;
  }

  if (updatedIntent) {
    directive.updatedIntent = updatedIntent;
  }
  return [directive];
}

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  //alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  //alexa.dynamoDBTableName = 'DYNAMODB_TABLE_NAME'; //uncomment this line to save attributes to DB
  alexa.execute();
};
