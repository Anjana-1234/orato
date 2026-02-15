import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="page-wrapper">
      {/* Navigation - Change to isLoggedIn={true} for authenticated state */}
      <Navbar isLoggedIn={false} />

      {/* Main Content */}
      <main className="page-container">
        <section className="text-center py-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl mb-12">
          <h1 className="text-5xl font-bold text-text-dark mb-4">
            Welcome to Orato
          </h1>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;