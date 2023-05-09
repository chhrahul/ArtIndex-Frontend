import React from 'react'
import { Navigate } from 'react-router-dom'
export default function Protected({ isSignedIn, children }) {
  console.log('is sign in ', isSignedIn)
  if (!isSignedIn) {
    return <Navigate to="/home" replace />
  }
  return children
}
