import React from 'react';
import useDoc from './useDoc';

interface Props {
  channelId: string;
}

const ChannelInfo = ({ channelId }: Props) => {
  const channel = useDoc(`channels/${channelId}`);
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{' '}
        <input className="TopicInput" defaultValue={channel && channel.topic} />
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
};

export default ChannelInfo;
