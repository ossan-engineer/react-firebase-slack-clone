import React from 'react';
import { db } from './firebase';

const ChatInputBox = ({ user, channelId }: any) => {
  return (
    <form
      className="ChatInputBox"
      onSubmit={(e: any) => {
        e.preventDefault();
        const value = e.target.elements[0].value;
        db.collection('channels')
          .doc(channelId)
          .collection('messages')
          .add({
            user: db.collection('users').doc(user.uid),
            text: value,
            createdAt: new Date(),
          });
        e.target.reset();
      }}
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
};

export default ChatInputBox;
