import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState({}); // Initialize user state with an empty object

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:", response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    // Initialize Google Sign-In
    google.accounts.id.initialize({
      client_id: "870805169859-bgm764msno3hs3h3asr29ul9jom6tsec.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    // Center the prompt element
    const signInDiv = document.getElementById("signInDiv");
    signInDiv.style.position = 'absolute';
    signInDiv.style.top = '50%';
    signInDiv.style.left = '50%';
    signInDiv.style.transform = 'translate(-50%, -50%)';

    // Prompt for Google Sign-In
    google.accounts.id.prompt();
  }, []);

  return (
    <div className="Login" style={{backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div id="signInDiv"></div>
      {
      Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h3>{user.name}</h3>
          <ul>
            {Object.entries(user).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value.toString()}
              </li>
            ))}
          </ul>
        </div>
        )}
    </div>
  );
}

export default Login;
