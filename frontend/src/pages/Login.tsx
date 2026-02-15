import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Navbar isLoggedIn={false} />
      
      <main className="page-container flex justify-center items-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-text-dark mt-20 mb-10">Login / Sign Up</h1>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;