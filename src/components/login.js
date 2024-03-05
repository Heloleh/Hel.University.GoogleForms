// login.js

import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "909770635190-u2ir977eij4dric7bjt9p6seo90c9o3v.apps.googleusercontent.com";

function Login({ setUser }) {

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    setUser({
      id: res.profileObj.googleId,
      name: res.profileObj.name,
      email: res.profileObj.email,
    });
  }

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  }

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}

export default Login;
