import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

module.exports = functions.database
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
