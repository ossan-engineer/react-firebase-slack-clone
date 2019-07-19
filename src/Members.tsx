import React from 'react';
import useCollection from './useCollection';

interface Props {
  channelId: string;
}

const sortByName = (a: any, b: any) => {
  if (a.displayName > b.displayName) {
    return 1;
  } else if (a.displayName < b.displayName) {
    return -1;
  }

  return 0;
};

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
        {members.sort(sortByName).map((member: any) => (
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
