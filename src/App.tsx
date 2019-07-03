import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { firebase } from './firebase';

const Login = () => {
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

const App: React.FC = () => {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <Login />
  );
};

export default App;
