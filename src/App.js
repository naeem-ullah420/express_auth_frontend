import React from 'react'
import { Button, InputGroup } from 'react-bootstrap';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
// import { ArrowRight, Person, PersonFill } from 'react-bootstrap-icons';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
    <Toaster position="top-right"/>
    <BrowserRouter>
        <Routes>
            <Route path='/signUp' element={<SignUp/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App