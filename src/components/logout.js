import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "909770635190-u2ir977eij4dric7bjt9p6seo90c9o3v.apps.googleusercontent.com";

function Logout({ setUser }) {

  const onSuccess = () => {
    console.log("Logout successful!");
    setUser(null);
  }

  return (
    <div id="signInButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout;
