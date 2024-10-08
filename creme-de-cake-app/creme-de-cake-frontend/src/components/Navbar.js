import React from 'react'; 
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';  // Import the styles

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#5a3f2d' }}>
      <div className="container">
        {/* Brand Logo or Text */}
        <Link className="navbar-brand" to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          {/* Logo with hover effect */}
          <img 
            src="/images/logo.png"  // Path to your logo
            alt="Cre`me de Cake"
            className="logo"  // Add a class for the logo to style it
          />
          Cre`me de Cake App
        </Link>

        {/* Navbar Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalogue" style={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Catalogue
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customize" style={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Customize Cake
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" style={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/checkout" style={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Checkout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" style={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

