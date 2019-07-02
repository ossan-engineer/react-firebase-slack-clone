import React, { useState, useEffect } from 'react';
import { db } from './firebase';

const useCollection = (path: string, orderBy: string) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    return db
      .collection(path)
      .orderBy(orderBy)
      .onSnapshot(snapshot => {
        const docs: any = [];
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        console.log(docs);
        setDocs(docs);
      });
  }, []);

  return docs;
};

const Messages = () => {
  const messages = useCollection('/channels/general/messages', 'createdAt');
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message: any, index: number) => {
        return index === 0 ? (
          <div>
            <div className="Day">
              <div className="DayLine" />
              <div className="DayText">12/6/2018</div>
              <div className="DayLine" />
            </div>
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
