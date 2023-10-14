import React from 'react'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'

function UnProtectedLayout() {
    const auth_token = localStorage.getItem('token')
    const navigate = useNavigate();

    useEffect(() => {
        if(auth_token) {
            navigate("/")
        }
    }, [])

    return (
    <div>
        {!auth_token && <Outlet/>}
    </div>
  )
}

export default UnProtectedLayout