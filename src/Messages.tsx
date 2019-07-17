import React from 'react';
import useCollection from './useCollection';
import useDocWithCache from './useDocWithCache';

const FirstMessageFromUser = ({ message, showDay }: any) => {
  const author = useDocWithCache(message.user.path);
  console.log(new Date(message.createdAt.seconds * 1000));
  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{ backgroundImage: author ? `url("${author.photoUrl}")` : '' }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{' '}
            <span className="TimeStamp">
              {new Date(message.createdAt.seconds * 1000).toLocaleTimeString()}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
};

const Messages = ({ channelId }: any) => {
  const messages = useCollection(
    `/channels/${channelId}/messages`,
    'createdAt',
  );
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message: any, index: number) => {
        const previous: any = messages[index - 1];
        const showDay = false;
        const showAvatar = !previous || message.user.id !== previous.user.id;
        return showAvatar ? (
          <FirstMessageFromUser
            message={message}
            showDay={showDay}
            key={message.id}
          />
        ) : (
          <div key={message.id}>
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
