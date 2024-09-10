'use client'
import React from 'react';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';

const HomePage: React.FC = () => {
  return (
      <div className='HomePage'>
        <Navbar />
        <LandingPage />;
      </div>
  );
};

export default HomePage;