import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.onUserStatusChanged = functions.database
  .ref('status/{userId}')
  .onUpdate((change, context) => {
    const eventStatus = change.after.val();
    const userDoc = db.doc(`users/${context.params.userId}`);

    return change.after.ref.once('value').then(snapshot => {
      const status = snapshot.val();
      if (status.lashChanged > eventStatus.lashChanged) {
        return;
      }

      eventStatus.lashChanged = new Date(eventStatus.lastChanged);
      userDoc.update({
        status: eventStatus,
      });
    });
  });

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
