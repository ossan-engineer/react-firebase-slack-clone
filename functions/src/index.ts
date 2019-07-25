import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  console.log('hello there!');
  if (Math.random() > 0.25) {
    console.error('Blow up!');
  } else if (Math.random() > 0.25) {
    throw new Error('hey');
  } else {
    console.log('hey');
  }
  response.send('Hello with errors and stuff!');
});
