import * as admin from 'firebase-admin';

admin.initializeApp();

exports.onUserStatusChanged = require('./triggers/onUserStatusChanged');
exports.onCleverbotMessage = require('./triggers/onCleverBotMessage');
exports.helloWorld = require('./routes/helloWorld');
