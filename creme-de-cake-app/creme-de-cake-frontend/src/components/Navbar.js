import React from 'react'; 
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#5a3f2d' }}>
      <div className="container">
        {/* Brand Logo or Text */}
        <Link className="navbar-brand" to="/" style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          {/* Optional logo image */}
          <img 
            src="/images/logo.png"  // Add your logo here
            alt="logo.Cake"
            style={{ width: '40px', height: '40px', marginRight: '10px' }} // Adjust logo size
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


