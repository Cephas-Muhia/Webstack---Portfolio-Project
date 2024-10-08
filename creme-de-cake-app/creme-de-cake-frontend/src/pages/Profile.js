import React, { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [newInfo, setNewInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInfo({
      ...newInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Save the data logic here
    setIsEditing(false);
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Profile Header */}
      <div className="text-center mt-5">
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '3rem', color: '#5a3f2d', fontWeight: 'bold', marginBottom: '10px' }}>
          Welcome to Your Profile!
        </h1>
        <p style={{ fontSize: '1.4rem', color: '#5a3f2d', marginBottom: '20px' }}>
          Manage your account, personalize your orders, and more.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => console.log('Google login initiated!')} 
          style={{
            marginTop: '15px',
            backgroundColor: '#4285F4',
            color: '#fff',
            fontFamily: "'Poppins', sans-serif",
            padding: '10px 20px',
            borderRadius: '25px',
          }}
        >
          Login with Google
        </button>
      </div>

      {/* Profile Image */}
      <div className="text-center my-4">
        <img
          src="/images/default-avatar.png"
          alt="Profile"
          className="rounded-circle"
          style={{
            width: '150px',
            height: '150px',
            border: '5px solid #5a3f2d',
            marginBottom: '20px',
          }}
        />
      </div>

      {/* Profile Information Card */}
      <div className="card mx-auto" style={{ maxWidth: '600px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div className="card-body">
          <h3 className="text-center" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.8rem', color: '#5a3f2d', fontWeight: 'bold' }}>
            {isEditing ? 'Register Your Profile' : 'Profile Information'}
          </h3>

          {/* Form */}
          <form className="mt-4">
            
            {/* Name Field */}
            <div className="form-group mb-4">
              <label htmlFor="name" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', color: '#5a3f2d' }}>
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={newInfo.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your full name"
                  required
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.1rem',
                    backgroundColor: '#f5e1a4',
                    color: '#5a3f2d',
                    border: '1px solid #5a3f2d',
                    padding: '10px',
                  }}
                />
              ) : (
                <p className="form-control-plaintext" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', color: '#5a3f2d' }}>
                  Please register to update your name.
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group mb-4">
              <label htmlFor="email" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', color: '#5a3f2d' }}>
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={newInfo.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email address"
                  required
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.1rem',
                    backgroundColor: '#f5e1a4',
                    color: '#5a3f2d',
                    border: '1px solid #5a3f2d',
                    padding: '10px',
                  }}
                />
              ) : (
                <p className="form-control-plaintext" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', color: '#5a3f2d' }}>
                  Please register to update your email.
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="form-group mb-4">
              <label htmlFor="phoneNumber" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', color: '#5a3f2d' }}>
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={newInfo.phoneNumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your phone number"
                  required
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.1rem',
                    backgroundColor: '#f5e1a4',
                    color: '#5a3f2d',
                    border: '1px solid #5a3f2d',
                    padding: '10px',
                  }}
                />
              ) : (
                <p className="form-control-plaintext" style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.2rem', color: '#5a3f2d' }}>
                  Please register to provide your phone number.
                </p>
              )}
            </div>

            {/* Save or Edit Button */}
            <div className="mt-4 text-center">
              {isEditing ? (
                <button 
                  className="btn btn-dark"
                  onClick={handleSave}
                  style={{
                    backgroundColor: '#5a3f2d',
                    color: '#fff',
                    fontFamily: "'Poppins', sans-serif",
                    padding: '10px 20px',
                    borderRadius: '25px',
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button 
                  className="btn btn-dark"
                  onClick={handleEditToggle}
                  style={{
                    backgroundColor: '#5a3f2d',
                    color: '#fff',
                    fontFamily: "'Poppins', sans-serif",
                    padding: '10px 20px',
                    borderRadius: '25px',
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer Logo */}
      <div className="text-center" style={{ marginTop: 'auto', padding: '30px 0', backgroundColor: '#f5e1a4' }}>
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{ width: '100%', height: 'auto', maxWidth: '600px', opacity: 0.9 }}
        />
      </div>
    </div>
  );
}

export default Profile;

