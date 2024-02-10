import React from 'react'
import NavBar from '../components/Nav'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

function ProtectedNavbarLayout() {

  const navigate = useNavigate();

  const auth_token = localStorage.getItem('token')
  

  // check it in react dev tools chrome
  const [userData, setUserData] = useState({})

   useEffect(() => {
    if(!auth_token) {
        console.log(auth_token)
        navigate("/login")
    }


    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/readProfile`, {
      headers: {'token': auth_token}
    }).then(res => {
      console.log(res)
      setUserData(res.data.data)
    }).catch(err => {
      console.log(err)
      localStorage.removeItem('token')
      navigate("/login")
    })
  }, [])


  return (
    <div>
        <NavBar userdata={userData}/>
        <Outlet/>
    </div>
  )
}

export default ProtectedNavbarLayout