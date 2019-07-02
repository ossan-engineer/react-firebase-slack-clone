import React, { useState, useEffect } from 'react';
import { db } from './firebase';

const Nav = () => {
  const [channels, setChannels] = useState<any>([]);

  useEffect(() => {
    return db.collection('channels').onSnapshot((snapshot: any) => {
      const docs: any[] = [];
      snapshot.forEach((doc: any) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setChannels(docs);
    });
  }, []);
  return (
    <div className="Nav">
      <div className="User">
        <img
          className="UserImage"
          alt="whatever"
          src="https://placekitten.com/64/64"
        />
        <div>
          <div>ossan-engineer</div>
          <div>
            <button className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map((channel: any) => (
          <a key={channel.id} href={`/channels/${channel.id}`}>
            # {channel.id}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
