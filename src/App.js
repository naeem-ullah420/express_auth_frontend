import React from 'react'
import { Button, InputGroup } from 'react-bootstrap';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import SignUp from './pages/SignUpPage';
import Login from './pages/LoginPage';
// import { ArrowRight, Person, PersonFill } from 'react-bootstrap-icons';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedNavbarLayout from './layouts/ProtectedNavbarLayout';
import UnProtectedLayout from './layouts/UnProtectedLayout';
import NotFound from './pages/NotFound';
import ProductDetailPage from './pages/ProductDetailPage';
import { ProductProvider } from './store/ProductContext';

function App() {
  return (
    <div>
    <Toaster position="top-right"/>
    <ProductProvider>
      <BrowserRouter>
          <Routes>

              {/* non-protected routes */}
              <Route element={<UnProtectedLayout/>}>
                <Route path='/signUp' element={<SignUp/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
                <Route path='/resetPassword/:token' element={<ResetPassword/>}></Route>
              </Route>

              {/* protected routes */}
              <Route element={<ProtectedNavbarLayout/>}>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/product/:productId' element={<ProductDetailPage/>}></Route>
              </Route>

              <Route path='*' element={<NotFound/>}></Route>
          </Routes>
      </BrowserRouter>
    </ProductProvider>
    </div>
  )
}

export default App