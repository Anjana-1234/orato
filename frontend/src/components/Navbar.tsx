import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Active link styling
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-all py-2 px-4 block no-underline rounded-lg
     hover:bg-[#e9f7ec] hover:scale-105 hover:shadow-md
     ${isActive ? 'text-green-500 font-semibold' : 'text-text-dark'}`;

  return (
    <nav className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-green-50/70 backdrop-blur-md border border-green-100 shadow-lg rounded-2xl transition-all max-w-7xl mx-auto">        <div className="px-8 py-3">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 no-underline"
              onClick={closeMobileMenu}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-300 to-green-400 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-green-500">Orato</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <ul
            className={`
                hidden md:flex md:items-center md:gap-8
                absolute md:static left-1/2 -translate-x-1/2 md:translate-x-0 top-[70px]
                ${isMobileMenuOpen ? 'flex flex-col bg-white w-full left-0 top-[70px] p-6 shadow-md' : ''}
              `}
          >
            <li>
              <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={navLinkClass} onClick={closeMobileMenu}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/progress" className={navLinkClass} onClick={closeMobileMenu}>
                Progress
              </NavLink>
            </li>
            <li>
              <NavLink to="/setting" className={navLinkClass} onClick={closeMobileMenu}>
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass} onClick={closeMobileMenu}>
                About Us
              </NavLink>
            </li>
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {isLoggedIn ? (
              <Link
                to="/account"
                className="flex items-center gap-2 text-text-dark hover:bg-green-300 py-2 px-4 rounded-lg transition-colors no-underline"
                onClick={closeMobileMenu}
              >
                <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="font-medium hidden md:inline">Account</span>
              </Link>
            ) : (
              <Link
                to="/signin"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Login
              </Link>
            )}

            {/* Hamburger Menu */}
            <div
              className="md:hidden flex flex-col gap-1 cursor-pointer z-50"
              onClick={toggleMobileMenu}
            >
              <span className={`w-6 h-0.5 bg-text-dark transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-text-dark transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-text-dark transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>

          </div>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;