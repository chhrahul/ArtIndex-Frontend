import React from 'react'
import { useEffect } from 'react';
export default function GoogleButton({ onSuccess, onFailure }) {
    useEffect(() => {
        const handleSignIn = () => {
          // Initialize Google Sign-In client
          gapi.load('auth2', () => {
            gapi.auth2.init({
              client_id: '731019835589-6ff8j6hb3k7paort3etsrjbfq1rmbb5m.apps.googleusercontent.com',
            });
          });
    
          // Render the Google Sign-In button
          gapi.signin2.render('google-signin-button', {
            scope: 'profile email',
            width: 200,
            height: 50,
            longtitle: true,
            theme: 'light',
            onsuccess: onSuccess,
            onfailure: onFailure,
          });
        };
    
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = handleSignIn;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, [onSuccess, onFailure]);
  return (
    <div>
        <div id="google-signin-button" />
    </div>
  )
}

