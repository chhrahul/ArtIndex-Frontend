import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleButton } from 'react-google-button';
import { AxiosInstance } from '../utils';
export default function GoogleEmails() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    
    const responseGoogle = async (response) => {
        console.log(response);
       return
        if (response && response.code) {
          setLoading(true);
          try {
            await AxiosInstance.get(`/auth/google/callback?code=${response.code}`);
            setIsLoggedIn(true);
          } catch (error) {
            console.error('Error authenticating:', error);
          }
          setLoading(false);
        } else {
          console.error('Google authentication failed.');
        }
      };
    
      const retrieveEmails = async () => {
        setLoading(true);
        try {
          const response = await AxiosInstance.get('/Googleemails');
          setEmails(response.data);
        } catch (error) {
          console.error('Error retrieving emails:', error);
        }
        setLoading(false);
      };
 
    

   
    return (
        <>
        <h1>Email List</h1>
        {isLoggedIn ? (
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
            <GoogleButton onClick={responseGoogle} />
        )}
      </>
    )
}
