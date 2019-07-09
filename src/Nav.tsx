import React from 'react';
import { Link } from '@reach/router';
import useCollection from './useCollection';
import { firebase } from './firebase';

const Nav = ({ user }: any) => {
  const channels = useCollection('/channels');

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user.photoUrl} />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button
              className="text-button"
              onClick={() => {
                firebase.auth().signOut();
              }}
            >
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map((channel: any) => (
          <Link key={channel.id} to={`/channels/${channel.id}`}>
            # {channel.id}
          </Link>
        ))}
        ¨
      </nav>
    </div>
  );
};

export default Nav;
