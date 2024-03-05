import Form from './components/Form';
import React, { useState, useEffect } from 'react';
import './App.css';
import LoginButton from "./components/login";
import LogoutButton from "./components/logout";
import { gapi } from 'gapi-script';

const clientId = "909770635190-u2ir977eij4dric7bjt9p6seo90c9o3v.apps.googleusercontent.com";

function App() {
  const [user, setUser] = useState(null);
  const [submittedForms, setSubmittedForms] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          clientId: clientId,
          scope: '',
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          if (authInstance.isSignedIn.get()) {
            const currentUser = authInstance.currentUser.get();
            const userProfile = currentUser.getBasicProfile();
            const userData = {
              id: userProfile.getId(),
              name: userProfile.getName(),
              email: userProfile.getEmail(),
            };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        });
    }

    // Check if user data is stored in localStorage on initial load
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleFormSubmit = (formData) => {
    setSubmittedForms((prevForms) => [...prevForms, formData]);
  };

  const handleLogout = () => {
    setSubmittedForms([]); // Reset submitted forms on logout
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <div className="left-panel">
        {user ? (
          <div>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <Form onSubmit={handleFormSubmit} />
          </div>
        ) : (
          <div>
            <h1>My React Form</h1>
            <LoginButton setUser={setUser} />
          </div>
        )}
      </div>
      <div className="right-panel">
        <div>
          <h2>Submitted Forms:</h2>
          {submittedForms.map((form, index) => (
            <div key={index}>
              <p>Message: {form.message}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <LogoutButton setUser={handleLogout} />
    </div>
  );
}

export default App;
