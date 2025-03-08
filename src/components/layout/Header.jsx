import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { Menu, X, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error || 'Failed to logout');
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          URLify
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="p-2 md:hidden" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link>
              <Link to="/my-urls" className="text-gray-600 hover:text-primary">My URLs</Link>
              
              {/* User dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary"
                  onClick={toggleDropdown}
                >
                  <span>{user?.name || 'User'}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="container py-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-600 hover:text-primary" onClick={toggleMenu}>Home</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary" onClick={toggleMenu}>Dashboard</Link>
                <Link to="/my-urls" className="text-gray-600 hover:text-primary" onClick={toggleMenu}>My URLs</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="text-left text-gray-600 hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary" onClick={toggleMenu}>Login</Link>
                <Link to="/signup" className="btn btn-primary" onClick={toggleMenu}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';

const Header = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };
  
  return (
    <header className="bg-dark text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">URLify</Link>
        
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
                </li>
                <li>
                  <Link to="/my-urls" className="hover:text-blue-400">My URLs</Link>
                </li>
                <li className="ml-4">
                  <span className="mr-3 text-sm">Hello, {user?.name}</span>
                  <Button onClick={handleLogout} variant="danger" className="py-1">Logout</Button>
                </li>
              </>
            ) : (
              <>
                <li className="ml-4">
                  <Link to="/login">
                    <Button variant="secondary" className="py-1">Login</Button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <Button className="py-1">Sign Up</Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
