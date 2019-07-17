import React from 'react';
import formatDate from 'date-fns/format';
import jaLocale from 'date-fns/locale/ja';
import isSameDay from 'date-fns/is_same_day';
import useCollection from './useCollection';
import useDocWithCache from './useDocWithCache';

const shouldShowAvatar = (previous: any, message: any) => {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const differentUser = message.user.id !== previous.user.id;
  if (differentUser) {
    return true;
  }

  const hasBeenAWhile =
    message.createdAt.seconds - previous.createdAt.seconds > 60;
  return hasBeenAWhile;
};

const shouldShowDay = (previous: any, message: any) => {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(
    previous.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000,
  );
  return isNewDay;
};

const FirstMessageFromUser = ({ message, showDay }: any) => {
  const author = useDocWithCache(message.user.path);
  return (
    <div>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}
          </div>
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
              {formatDate(message.createdAt.seconds * 1000, 'HH:mm', {
                locale: jaLocale,
              })}
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
        const showDay = shouldShowDay(previous, message);
        const showAvatar = shouldShowAvatar(previous, message);
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
