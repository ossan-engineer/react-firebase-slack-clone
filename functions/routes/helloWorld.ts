import * as functions from 'firebase-functions';

module.exports = functions.https.onRequest((request, response) => {
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
