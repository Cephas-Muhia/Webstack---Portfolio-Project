import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './profile.css'; 

const UserProfilePage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
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

  const API_URL = 'http://localhost:5000/api'; // Update this with your backend API URL

  // Handle user sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: userDetails.email,
        password: userDetails.password,
      });
      setIsSignedIn(true);
      setUserDetails(response.data.user); // Set the retrieved user data
    } catch (error) {
      console.error("Sign in failed:", error.response?.data);
      alert("Sign in failed: " + error.response?.data?.message);
    }
  };

  // Google login success handler
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await axios.post(`${API_URL}/auth/google`, { idToken: credential });
      setUserDetails(response.data.user);
      setIsSignedIn(true);
    } catch (error) {
      console.error("Google login failed: ", error);
      alert("Google login failed.");
    }
  };

  // Google login failure handler
  const handleGoogleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
  };

  // Registration handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
        birthday: userDetails.birthday,
        address: userDetails.address,
        preferredCakeFlavors: userDetails.preferredCakeFlavors,
        password: userDetails.password,
        confirmPassword: userDetails.confirmPassword,
      });
      setIsRegistered(true);
      alert("Registration successful! You can now sign in.");
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
      alert("Registration failed: " + error.response?.data?.message);
    }
  };

  // Toggle to registration view
  const toggleToRegister = () => {
    setIsRegistered(true);
  };

  // Toggle to sign-in view
  const toggleToSignIn = () => {
    setIsRegistered(false);
  };

  return (
    <div>
      <h2>{isSignedIn ? 'User Profile' : isRegistered ? 'Register' : 'Sign In'}</h2>
      {!isSignedIn ? (
        isRegistered ? (
          <form onSubmit={handleRegister} className="form">
            <input
              type="text"
              placeholder="Name"
              value={userDetails.name}
              onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={userDetails.phoneNumber}
              onChange={(e) => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
              required
            />
            <input
              type="date"
              value={userDetails.birthday}
              onChange={(e) => setUserDetails({ ...userDetails, birthday: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={userDetails.address}
              onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Preferred Cake Flavors (comma-separated)"
              value={userDetails.preferredCakeFlavors.join(',')}
              onChange={(e) => setUserDetails({ ...userDetails, preferredCakeFlavors: e.target.value.split(',') })}
            />
            <input
              type="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={userDetails.confirmPassword}
              onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
              required
            />
            <button type="submit" className="register-button">Register</button>
            <p>Already have an account? <button type="button" onClick={toggleToSignIn} className="sign-in-button">Sign In</button></p>
          </form>
        ) : (
          <div className="login-container">
            <form onSubmit={handleSignIn} className="form">
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              />
              <button type="submit" className="sign-in-button">Sign In</button>
              <p>Don't have an account? <button type="button" onClick={toggleToRegister} className="register-button">Register</button></p>
            </form>
            <div className="google-login">
              <h4>Or sign in with Google</h4>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />
            </div>
          </div>
        )
      ) : (
        <div className="profile">
          <img src={userDetails.profilePhoto} alt="Profile" className="profile-photo" />
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
          <p><strong>Birthday:</strong> {userDetails.birthday}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Preferred Cake Flavors:</strong> {userDetails.preferredCakeFlavors.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;

