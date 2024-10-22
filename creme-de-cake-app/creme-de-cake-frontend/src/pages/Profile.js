import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './profile.css';

const UserProfilePage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePhoto: null,
    birthday: '',
    address: '',
    preferredCakeFlavors: [],
    password: '',
    confirmPassword: '',
  });

  const API_URL = 'http://localhost:5000/api';

  // Handle input changes and reset error message
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    setError('');
  };

  // Handle user sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: userDetails.email,
        password: userDetails.password,
      });
      setIsSignedIn(true);
      setUserDetails(response.data.user);
    } catch (error) {
      setError("Sign in failed: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const { credential } = credentialResponse;
      const response = await axios.post(`${API_URL}/auth/google`, { idToken: credential });
      setUserDetails(response.data.user);
      setIsSignedIn(true);
    } catch (error) {
      setError("Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        ...userDetails,
        preferredCakeFlavors: userDetails.preferredCakeFlavors.filter(Boolean),
      });
      setIsRegistered(true);
      alert("Registration successful! You can now sign in.");
    } catch (error) {
      setError("Registration failed: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/auth/update`, {
        ...userDetails,
        preferredCakeFlavors: userDetails.preferredCakeFlavors.filter(Boolean),
      });
      setUserDetails(response.data.user);
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Profile update failed: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Effect to load user data if signed in
  useEffect(() => {
    if (isSignedIn) {
      handleProfileUpdate(); // Update the profile after sign-in
    }
  }, [isSignedIn]);

  return (
    <div className="user-profile-page">
      <h2>{isSignedIn ? 'User Profile' : isRegistered ? 'Register' : 'Sign In'}</h2>

      {!isSignedIn ? (
        <div className="form-container">
          {error && <p className="error-message">{error}</p>}

          {isRegistered ? (
            <form onSubmit={handleRegister} className="form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={userDetails.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userDetails.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={userDetails.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <input
                type="date"
                name="birthday"
                value={userDetails.birthday}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={userDetails.address}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="preferredCakeFlavors"
                placeholder="Preferred Cake Flavors (comma-separated)"
                value={userDetails.preferredCakeFlavors.join(',')}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    preferredCakeFlavors: e.target.value.split(','),
                  })
                }
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="register-button" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
              <p>
                Already have an account?{' '}
                <button type="button" onClick={() => setIsRegistered(false)} className="sign-in-button">
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <div className="login-container">
              <form onSubmit={handleSignIn} className="form">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" className="sign-in-button" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <p>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setIsRegistered(true)} className="register-button">
                    Register
                  </button>
                </p>
              </form>
              <div className="google-login">
                <h4>Or sign in with Google</h4>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => setError('Google login failed')}
                >
                  <button className="google-login-button" type="button">
                    Sign In with Google
                  </button>
                </GoogleLogin>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="profile">
          {userDetails.profilePhoto && <img src={userDetails.profilePhoto} alt="Profile" className="profile-photo" />}
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
          <p><strong>Birthday:</strong> {userDetails.birthday}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Preferred Cake Flavors:</strong> {userDetails.preferredCakeFlavors.join(', ')}</p>
          <button onClick={handleProfileUpdate} className="update-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;

