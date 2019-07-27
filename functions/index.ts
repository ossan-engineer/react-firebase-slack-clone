import * as admin from 'firebase-admin';

admin.initializeApp();

exports.onUserStatusChanged = require('./triggers/onUserStatusChanged');
exports.helloWorld = require('./routes/helloWorld');
