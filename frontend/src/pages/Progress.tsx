import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Progrees: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Navbar isLoggedIn={true} />
      
      <main className="page-container flex justify-center items-center">
        <h1 className="text-4xl font-bold text-text-dark mt-20 mb-10">Progress Page</h1>
      </main>
      
      <Footer />
    </div>
  );
};

export default Progrees;