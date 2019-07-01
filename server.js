/**
 * Copyright 2018, Google, LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var express = require('express');
let cors = require('cors');
var app = express();
var fs = require('fs');
var uuid = require('uuid');

var bodyParser = require('body-parser');
const { struct } = require('pb-util');
const util = require('util');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:4200/");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
var options = {
  key: fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.cert')
  
};
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 var server = require('http')
   app.listen(8080, function(){
   console.log("Server connected. Listening on port: " + (process.env.PORT || 8080));
  });

app.get('/stopserver', function (req, res) {
  res.send('hello for stopserver')
})

app.get('/', function (req, res) {
  res.send('Server side running')
})

app.get('/dialogflow', async (req, res) => 
{
  console.log('return response before res.send');
 console.log(req.query.question);
  const responses =  await ds(req.query.question);
  res.send(responses);
  
}
);

async function ds(query){
 return detectIntentandSentiment("a","b",query,"en-us");
}

async function detectIntentandSentiment(
  projectId,
  sessionId,
  query,
  languageCode
) {
  // [START dialogflow_detect_intent_with_sentiment_analysis]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  console.log('entered');
  //const dialogflow = require('dialogflow');
  sessionId = uuid.v4();
  //'011bb950-f801-11e8-a9f4-eff5965aae41';
  languageCode = "en-US";
  projectId = "newagent-fpbukf";
  // Instantiates a session client
let config = { credentials: { private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDwZWkUsUUMWZQe\n5HZb5apP5E2zmJKlIYlHYBM5adsykmkf5lNU4g0i3OrglP/SUDQ4oyosLJ2xftUQ\nNsQhEZegkxT2AHYPT+gGpLAupe+Qv6tZ3tNuguJ943gWpyMNbvPyPARq/dW+GCAr\nmp8DJXaawLmQYFLy2rkVw8Hm49WP6BvM5MI7cqVjdO97cFCAEaik2UIj0COl92qw\n+Q0PPGcaw2VZ5RlbQYtglGVjcf1tdQ4XXdq8RpuRqYV6DHWovNMYEveA3HjD1CPu\nOHSNv7tsyEAlP6tKKjlQXZXaKYiIGWV1MFZIiN3552WYAZbVvR4hv6t9zFBZRb/l\nps0Lwe6HAgMBAAECggEAAfjbb62n6OHFIyev3QuXs8Z8pyEhqMoHw15dTsQQ24ks\nuvrRQzC4QEzs324on7I9GDCbxphEPXOejHbr9Q68Hk+w9Y8xHKRQ439VXtXk+gzW\n999TdR1tu+I+cM9Lr+1uISI0SgwHgCuTHl2lGmI/eE+PKuhFqBf3LHDtVqiMckWc\n4uzilRbXSi7kUVU5AHLLBoWPrRiMxJMB7WurPJoHx+Qf+04fWfUUCC1TVLAtiq7f\npKl9WNyWulSnGS6DqPB/JMLyusicWIJV/PNtz7wGcf07Ov5blaE6V7/X49SqTfhI\n+KGYDbIKtZf9OOJABA6KbA1VX4eECGqFA5gHz4Hy1QKBgQD/EFl3XBfvvA606VN3\nQH1eg+FXCgWwam+lAVQz6aQM8YAsVjh/g/GDNQ7zF0GN4cnAiuejy5Oyfylmc8Mt\nbIbokZ3+M4PejSkWpqpFbdzWJLg/ldlMl3SI2+MX8VkyqAchHTnhQImAwwfJysMn\npEhDli0TMES9Oluw9F8/KnalywKBgQDxR0eVhqHUrSlw2vPI3JWWw0c2zLMmqOcr\nq3/Of1pIPv31AiG+yFqBjyUi42d9bUR25KlnX5WdvghZc8TA7nOIZAORh9QwE232\nlvjSYdxWO9sLPmx1XdsoduLxRPt1wJHrKVhkx/4J81t8HS5baKHAXR2Q7GAMsI4z\nBm2W6lVitQKBgFqrdDJTAYtOPagf/XS57xcnKHapcGZLH873Tvh5SMD1JIweRk1G\nGRd8SAkwLjSCnBafCkMWvjVIsO3jnvFJ0BdilFhl9a2qXn3X11WA/Wz+dqTb3vg0\nKs/v4qWDPSMdyhMCca3aJEcqjV01f/RamPm1q+ZTVUwzL58S77zjmnPLAoGAILIp\nGDErYveoQvvYx2Jk/w4ta1an/FgtI3TVF/WYFWw72+TTD9h0s1Pjk2u/jXauLXJl\nJnYEf2DOHtkaU468p0HuXd1LOsyXPTBOPaw3QJRR5Z8q8WirlzstG8beUKGs5HIw\n4U9ctJp+zj3iF08BhGDZ7daqWW3fhziaxzWwJnUCgYAytTwXWUhFD6qKTuAblVA+\na3zXDoOkF+ilvJchaZVGZmWBgK6iXq4XIrnMt3PRf9ObMS3HBOP9nIRXb2MM06V7\nqHOiDpzyNRUvmHV/wvgCi1uv+Omw+LXLEdSbIxUlANv2Dd3dY/JdXP2r4RIHW0gd\nwuiFgzbhQtafuHCPxmufxA==\n-----END PRIVATE KEY-----\n", client_email: 'hexagontest@newagent-fpbukf.iam.gserviceaccount.com' } }
  const sessionClient = new dialogflow.SessionsClient(config);

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const sessionId = `user specific ID of session, e.g. 12345`;
  // const query = `phrase(s) to pass to detect, e.g. I'd like to reserve a room for six people`;
  // const languageCode = 'BCP-47 language code, e.g. en-US';

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    queryParams: {
      sentimentAnalysisRequestConfig: {
        analyzeQueryTextSentiment: true,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  console.log('intent Detection Confidence:');
  console.log(responses[0].queryResult.intentDetectionConfidence);
  
  if (responses[0].queryResult.intentDetectionConfidence < 1) 
  {
    console.log('----------------------------');
    if (responses[0].alternativeQueryResults && responses[0].alternativeQueryResults[0] && responses[0].alternativeQueryResults[0].knowledgeAnswers && responses[0].alternativeQueryResults[0].knowledgeAnswers.answers) {

      console.log(responses[0].alternativeQueryResults[0].knowledgeAnswers.answers[0].faqQuestion);
      if (responses[0].alternativeQueryResults[0].knowledgeAnswers.answers[1]) {
        console.log(responses[0].alternativeQueryResults[0].knowledgeAnswers.answers[1].faqQuestion);
      }
      if (responses[0].alternativeQueryResults[0].knowledgeAnswers.answers[2]) {
        console.log(responses[0].alternativeQueryResults[0].knowledgeAnswers.answers[2].faqQuestion);
      }
    }
  }
  console.log('----------------------------');

  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  if (result.sentimentAnalysisResult) {
    console.log(`Detected sentiment`);
    console.log(
      `  Score: ${result.sentimentAnalysisResult.queryTextSentiment.score}`
    );
    console.log(
      `  Magnitude: ${
      result.sentimentAnalysisResult.queryTextSentiment.magnitude
      }`
    );
  } else {
    console.log(`No sentiment Analysis Found`);
  }
  console.log('return response');
  return responses;
  // [END dialogflow_detect_intent_with_sentiment_analysis]
}

async function detectIntentwithTexttoSpeechResponse(
  projectId,
  sessionId,
  query,
  languageCode,
  outputFile
) {
  // [START dialogflow_detect_intent_with_texttospeech_response]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const sessionId = `user specific ID of session, e.g. 12345`;
  // const query = `phrase(s) to pass to detect, e.g. I'd like to reserve a room for six people`;
  // const languageCode = 'BCP-47 language code, e.g. en-US';
  // const outputFile = `path for audio output file, e.g. ./resources/myOutput.wav`;

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const fs = require(`fs`);

  // The audio query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    outputAudioConfig: {
      audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent:');
  const audioFile = responses[0].outputAudio;
  await util.promisify(fs.writeFile)(outputFile, audioFile, 'binary');
  console.log(`Audio content written to file: ${outputFile}`);
  // [END dialogflow_detect_intent_with_texttospeech_response]
}

async function detectIntentKnowledge(
  projectId,
  sessionId,
  languageCode,
  knowledgeBaseFullName,
  query
) {
  // [START dialogflow_detect_intent_knowledge]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const sessionId = `user specific ID of session, e.g. 12345`;
  // const languageCode = 'BCP-47 language code, e.g. en-US';
  // const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;
  // const query = `phrase(s) to pass to detect, e.g. I'd like to reserve a room for six people`;

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const knowbase = new dialogflow.KnowledgeBasesClient();
  const knowledgeBasePath = knowbase.knowledgeBasePath(
    projectId,
    knowledgeBaseFullName
  );

  // The audio query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    queryParams: {
      knowledgeBaseNames: [knowledgeBasePath],
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(`Query text: ${result.queryText}`);
  console.log(`Detected Intent: ${result.intent.displayName}`);
  console.log(`Confidence: ${result.intentDetectionConfidence}`);
  console.log(`Query Result: ${result.fulfillmentText}`);
  const answers = result.knowledgeAnswers.answers;
  console.log(`There are ${answers.length} anwser(s);`);
  answers.forEach(a => {
    console.log(`   answer: ${a.answer}`);
    console.log(`   confidence: ${a.matchConfidence}`);
    console.log(`   match confidence level: ${a.matchConfidenceLevel}`);
  });
  // [END dialogflow_detect_intent_knowledge]
}

async function detectIntentwithModelSelection(
  projectId,
  sessionId,
  audioFilePath,
  languageCode,
  model
) {
  // [START dialogflow_detect_intent_with_model_selection]
  const fs = require('fs');

  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'ID of GCP project associated with your Dialogflow agent';
  // const sessionId = `user specific ID of session, e.g. 12345`;
  // const audioFilePath = `path to local audio file, e.g. ./resources/book_a_room.wav`;
  // const languageCode = 'BCP-47 language code, e.g. en-US';
  // const model = `speech mode selected for given request, e.g. video, phone_call, command_and_search, default`;

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  // Read the content of the audio file and send it as part of the request.
  const readFile = util.promisify(fs.readFile);
  const inputAudio = await readFile(audioFilePath);
  const request = {
    session: sessionPath,
    queryInput: {
      audioConfig: {
        audioEncoding: `AUDIO_ENCODING_LINEAR_16`,
        sampleRateHertz: 16000,
        languageCode: languageCode,
        model: model,
      },
    },
    inputAudio: inputAudio,
  };
  // Recognizes the speech in the audio and detects its intent.
  const responses = await sessionClient.detectIntent(request);
  const contextClient = new dialogflow.ContextsClient();
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  const parameters = JSON.stringify(struct.decode(result.parameters));
  console.log(`  Parameters: ${parameters}`);
  if (result.outputContexts && result.outputContexts.length) {
    console.log(`  Output contexts:`);
    result.outputContexts.forEach(context => {
      const contextId = contextClient.matchContextFromContextName(context.name);
      const contextParameters = JSON.stringify(
        struct.decode(context.parameters)
      );
      console.log(`    ${contextId}`);
      console.log(`      lifespan: ${context.lifespanCount}`);
      console.log(`      parameters: ${contextParameters}`);
    });
  }
  // [END dialogflow_detect_intent_with_model_selection]
}




