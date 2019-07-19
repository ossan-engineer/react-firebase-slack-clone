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
        {members.map((member: any) => (
          <div className="Member" key={member.id}>
            <div className="MemberStatus online" />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
