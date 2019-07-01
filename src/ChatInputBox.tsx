import React from 'react';
import { db } from './firebase';

const ChatInputBox = () => {
  return (
    <form
      className="ChatInputBox"
      onSubmit={(e: any) => {
        e.preventDefault();
        const value = e.target.elements[0].value;
        db.collection('channels')
          .doc('lunch')
          .collection('messages')
          .add({
            text: value,
            createdAt: new Date(),
          });
      }}
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
};

export default ChatInputBox;
