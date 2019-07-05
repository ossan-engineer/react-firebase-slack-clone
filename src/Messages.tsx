import React from 'react';
import useCollection from './useCollection';

const FirstMessageFromUser = ({ message, showDay }: any) => (
  <div>
    {showDay && (
      <div className="Day">
        <div className="DayLine" />
        <div className="DayText">12/6/2018</div>
        <div className="DayLine" />
      </div>
    )}
    <div className="Message with-avatar">
      <div className="Avatar" />
      <div className="Author">
        <div>
          <span className="UserName">Ryan Florence </span>
          <span className="TimeStamp">3:37 PM</span>
        </div>
        <div className="MessageContent">{message.text}</div>
      </div>
    </div>
  </div>
);

const Messages = () => {
  const messages = useCollection('/channels/general/messages', 'createdAt');
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message: any, index: number) => {
        const previous: any = messages[index - 1];
        const showDay = false;
        const showAvatar = !previous || message.user.id !== previous.user.id;
        return showAvatar ? (
          <FirstMessageFromUser message={message} showDay={showDay} />
        ) : (
          <div>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
