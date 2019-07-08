import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Channel from './Channel';
import { firebase, db } from './firebase';
import { Router, Redirect } from '@reach/router';

const Login = () => {
  const [authError, setAuthError] = useState<any>(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>{authError.message}</p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
};

const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(user);
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });
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
      <Router>
        <Channel path="channels/:channelId" user={user} />
        <Redirect from="/" to="channels/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
};

export default App;
