import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleLoginButton from '../components/GoogleButton';
import { AxiosInstance } from '../utils';
export default function GoogleEmails() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const handleGoogleLoginSuccess = async (googleUser) => {
    //     const idToken = googleUser.getAuthResponse().id_token;
    
    //     try {
    //       // Send the ID token to your server for verification
    //       const response = await axios.post('/api/google/login', { idToken });
    //       console.log(response.data);
    //     } catch (error) {
    //       console.error('Error logging in with Google:', error);
    //     }
    //   };
    
    //   const handleGoogleLoginFailure = (error) => {
    //     console.error('Google login failed:', error);
    //   };
    
    //   const handleGoogleButtonClick = () => {
    //     console.log('Google button clicked!');
    //   };
    
    //   const responseGoogle = async (response) => {
    //     console.log(response);
    //     if (response && response.code) {
    //       setLoading(true);
    //       try {
    //         // Replace the API endpoint with your backend endpoint for handling Google authentication
    //         const authResponse = await AxiosInstance.get(`/auth/google/callback?code=${response.code}`);
    //         setIsLoggedIn(true);
    //         // You may store the access token or perform any additional actions after successful authentication
    //       } catch (error) {
    //         console.error('Error authenticating:', error);
    //       }
    //       setLoading(false);
    //     } else {
    //       console.error('Google authentication failed.');
    //     }
    //   };
    
    //   const retrieveEmails = async () => {
    //     setLoading(true);
    //     try {
    //       // Replace the API endpoint with your backend endpoint for retrieving emails
    //       const response = await AxiosInstance.get('/Googleemails');
    //       setEmails(response.data);
    //     } catch (error) {
    //       console.error('Error retrieving emails:', error);
    //     }
    //     setLoading(false);
    //   };
    

   
    return (
        <>
        <h1>Email List</h1>
        {/* {isLoggedIn ? (
          <div>
            <button onClick={retrieveEmails} >Retrieve Emails</button>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <ul>
                {emails.map((email) => (
                  <li key={email.id}>
                    <div>From: {email.payload.headers.find((header) => header.name === 'From').value}</div>
                    <div>Subject: {email.payload.headers.find((header) => header.name === 'Subject').value}</div>
                    <div>Snippet: {email.snippet}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
            <GoogleLoginButton
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
      />
        )} */}
      </>
    )
}
