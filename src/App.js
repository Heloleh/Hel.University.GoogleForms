// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script';

const clientId = "909770635190-u2ir977eij4dric7bjt9p6seo90c9o3v.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          const currentUser = authInstance.currentUser.get();
          const userProfile = currentUser.getBasicProfile();
          setUser({
            id: userProfile.getId(),
            name: userProfile.getName(),
            email: userProfile.getEmail(),
          });
        }
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="App">
      <div>
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Please sign in</p>
        )}
      </div>
      <LoginButton setUser={setUser} />
      <LogoutButton setUser={setUser} />
    </div>
  );
}

export default App;
