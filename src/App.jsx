import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './components/Header';
// import Recipe from './components/Recipe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Contact from './components/Contact';
// import Profile from './components/Profile';
// import LoginModal from './components/LoginModal';
// import DemoAccount from './components/DemoAccount';
import Hero from './components/Hero';
import axios from 'axios';
import './styles/App.css';
import RecipeBook from './components/RecipeBook';
import HowTo from './components/HowTo';
import Footer from './components/Footer';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function App() {
  // const [user, setUser] = useState(null);
  // const [loginModalPreview, setLoginModalPreview] = useState(false);
  // const [isDemoAccount, setIsDemoAccount] = useState(false);

  // const demoUser = {
  //   picture: 'https://place-hold.it/400x400&text=DEMO&bold&fontsize=20',
  //   nickname: 'Demo User',
  //   email: 'demo_user@email.com',
  // };

  // const authRequest = async (method, token, id, data, queryParams) => {
  //   const baseURL = SERVER_URL;
  //   let url = id ? `/recipes/${id}` : '/recipes';
  //   if (queryParams) {
  //     url += '?' + new URLSearchParams(queryParams).toString();
  //   }

  //   const config = {
  //     method,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     baseURL,
  //     url,
  //     data: data ? data : null,
  //   };
  //   return await axios(config);
  // };

  // const toggleLoginModal = () => {
  //   setLoginModalPreview(!loginModalPreview);
  // };

  // const handleDemoAccount = () => {
  //   setIsDemoAccount(!isDemoAccount);
  //   setUser(isDemoAccount ? '' : demoUser);
  // };

  // const handleDemoLogout = () => {
  //   setIsDemoAccount(!isDemoAccount);
  //   setUser('');
  // };

  // const handleProfilePage = (person) => {
  //   setUser(person);
  // };

  // const { isAuthenticated } = props.auth0;

  return (
    <div className='content'>
      <Router>
        <Header />
        <Hero id='home' />
        <RecipeBook id='recipebook' />
        <HowTo id='howitworks' />
        <Footer />
      </Router>
    </div>
  );
}

const namedComp = withAuth0(App);

export default namedComp;
