import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



export default function ProtectedRoute({ isSignedIn, children }) {

  const isLogin = () => {
    const userId = localStorage.getItem("userId")
    return userId ? true : false
  }


  return isLogin() ? <Outlet /> : <Navigate to='/' />
}
