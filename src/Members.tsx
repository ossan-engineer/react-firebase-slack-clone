import React from 'react';
import useCollection from './useCollection';

interface Props {
  channelId: string;
}

const Members = ({ channelId }: Props) => {
  const members = useCollection('users', undefined, [
    `channels.${channelId}`,
    '==',
    true,
  ]);
  console.log(channelId, { members });
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
