import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GoogleEmails() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        // Make a GET request to retrieve email data from the server
        axios.get('/googleEmails')
            .then((response) => {
                setEmails(response.data);
            })
            .catch((error) => {
                console.error('Error retrieving email data:', error);
            });
    }, []);
    return (
        <div>
            <h1>Email List</h1>
            <ul>
                {emails.map((email) => (
                    <li key={email.id}>
                        <div>From: {email.payload.headers.find((header) => header.name === 'From').value}</div>
                        <div>Subject: {email.payload.headers.find((header) => header.name === 'Subject').value}</div>
                        <div>Snippet: {email.snippet}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
