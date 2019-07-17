import React, { useState, useEffect } from 'react';
import useCollection from './useCollection';
import { db } from './firebase';

const cache: any = {};
const pendingCache: any = {};

const useDoc = (path: string) => {
  const [doc, setDoc] = useState<any>(cache[path]);

  useEffect(() => {
    if (doc) {
      return;
    }

    const pending = pendingCache[path];
    const promise = pending || (pendingCache[path] = db.doc(path).get());

    promise.then((doc: any) => {
      const user = {
        ...doc.data(),
        id: doc.id,
      };
      setDoc(user);
      cache[path] = user;
    });
  }, [path, doc]);

  return doc;
};

const FirstMessageFromUser = ({ message, showDay }: any) => {
  const author = useDoc(message.user.path);
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
            <span className="TimeStamp">3:37 PM</span>
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
