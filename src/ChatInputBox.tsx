import React from 'react';

const ChatInputBox = () => {
  return (
    <form
      className="ChatInputBox"
      onSubmit={(e: any) => {
        e.preventDefault();
        console.log(e.target.elements[0].value);
      }}
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
};

export default ChatInputBox;
