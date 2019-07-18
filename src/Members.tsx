import React, { useEffect } from 'react';
import useCollection from './useCollection';
import { db } from './firebase';

interface Props {
  channelId: string;
}

const Members = ({ channelId }: Props) => {
  useEffect(() => {
    db.collection('users')
      .where(`channels.${channelId}`, '==', true)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.data());
        });
      });
  }, [channelId]);
  return (
    <div className="Members">
      <div>
        <div className="Member">
          <div className="MemberStatus offline" />
          Ryan Florence
        </div>
        <div className="Member">
          <div className="MemberStatus online" />
          cleverbot
        </div>
      </div>
    </div>
  );
};

export default Members;
