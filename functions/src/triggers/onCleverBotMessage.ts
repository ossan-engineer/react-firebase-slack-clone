import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
const db = admin.firestore();
const bot = {
  displayName: 'cleverbot',
  photoUrl: 'https://i.imgur.com/ydOMC2c.png',
  uid: 'cleverbot',
  status: {
    lashChanged: new Date(),
    state: 'online',
  },
  channels: {
    general: true,
  },
};

db.collection('users')
  .doc(bot.uid)
  .set(bot, { merge: true });

module.exports = functions.firestore
  .document('channels/general/messages/{messageId}')
  .onCreate((doc, context) => {
    const message = doc.data();
    if (!(message && message.text.startsWith('@cleverbot'))) {
      return;
    }

    return db.collection('channels/general/messages').add({
      text: 'hey, whats up?',
      user: db.collection('users').doc('cleverbot'),
      createdAt: new Date(),
    });
  });
