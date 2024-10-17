import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios'; 
import '../styles.css'; 

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePhoto: null,
    birthday: '',
    address: '',
    preferredCakeFlavors: [],
    password: '',
    confirmPassword: ''
  });

  // Fetch user profile data from the backend on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/users/profile'); 
        setProfileInfo(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setProfileInfo((prevState) => ({
      ...prevState,
      profilePhoto: URL.createObjectURL(file),
    }));
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const userProfile = JSON.parse(atob(credentialResponse.credential.split('.')[1]));

    setProfileInfo({
      name: userProfile.name,
      email: userProfile.email,
      phoneNumber: '',
      profilePhoto: userProfile.picture,
      birthday: '',
      address: '',
      preferredCakeFlavors: [],
      password: '',
      confirmPassword: ''
    });
  };

  const handleGoogleLoginFailure = (response) => {
    console.error('Google login failed:', response);
  };

  // Handle profile update submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put('http://localhost:5000/api/users/profile', profileInfo);
      console.log('Profile updated:', data);
      setIsEditing(false); // Disable editing after saving
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setProfileInfo({
      name: '',
      email: '',
      phoneNumber: '',
      profilePhoto: null,
      birthday: '',
      address: '',
      preferredCakeFlavors: [],
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <Container style={{ padding: '2rem', borderRadius: '8px', marginTop: '2rem', backgroundColor: '#f5e1a4' }}>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', color: '#3e2c41', textAlign: 'center' }}>
        My Profile
      </h2>

      {/* Profile Photo */}
      <Row className="text-center mb-4">
        <Col>
          <img
            src={profileInfo.profilePhoto || '/path/to/default-avatar.png'}
            alt="Profile"
            style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', marginBottom: '1rem' }}
          />
          {isEditing && (
            <Form.Group controlId="ProfilePhoto" className="text-center">
              <Form.Label
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  color: '#3e2c41',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                "Create your profile today and unlock personalized cake recommendations, faster checkouts, exclusive offers, and more!"
              </Form.Label>
              <Form.Control type="file" onChange={handlePhotoUpload} style={{ display: 'block', margin: 'auto' }} />
            </Form.Group>
          )}
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        {/* Name Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
            Name
          </Form.Label>
          <Col sm="10">
            {isEditing ? (
              <Form.Control
                type="text"
                name="name"
                value={profileInfo.name}
                onChange={handleChange}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
              />
            ) : (
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#3e2c41' }}>
                {profileInfo.name || <em style={{ fontSize: '1rem' }}>Please register to update your name.</em>}
              </p>
            )}
          </Col>
        </Form.Group>

        {/* Email Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
            Email
          </Form.Label>
          <Col sm="10">
            {isEditing ? (
              <Form.Control
                type="email"
                name="email"
                value={profileInfo.email}
                onChange={handleChange}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
              />
            ) : (
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#3e2c41' }}>
                {profileInfo.email || <em style={{ fontSize: '1rem' }}>Please register to update your email.</em>}
              </p>
            )}
          </Col>
        </Form.Group>

        {/* Phone Number Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhoneNumber">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
            Phone Number
          </Form.Label>
          <Col sm="10">
            {isEditing ? (
              <Form.Control
                type="text"
                name="phoneNumber"
                value={profileInfo.phoneNumber}
                onChange={handleChange}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
              />
            ) : (
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#3e2c41' }}>
                {profileInfo.phoneNumber || <em style={{ fontSize: '1rem' }}>Please register to update your phone number.</em>}
              </p>
            )}
          </Col>
        </Form.Group>

        {/* Birthday Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextBirthday">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
            Birthday
          </Form.Label>
          <Col sm="10">
            {isEditing ? (
              <Form.Control
                type="date"
                name="birthday"
                value={profileInfo.birthday}
                onChange={handleChange}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
              />
            ) : (
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#3e2c41' }}>
                {profileInfo.birthday || <em style={{ fontSize: '1rem' }}>Please register to update your birthday.</em>}
              </p>
            )}
          </Col>
        </Form.Group>

        {/* Address Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextAddress">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
            Address
          </Form.Label>
          <Col sm="10">
            {isEditing ? (
              <Form.Control
                type="text"
                name="address"
                value={profileInfo.address}
                onChange={handleChange}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
              />
            ) : (
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#3e2c41' }}>
                {profileInfo.address || <em style={{ fontSize: '1rem' }}>Please register to update your address.</em>}
              </p>
            )}
          </Col>
        </Form.Group>

        {/* Preferred Cake Types Field */}
        <Form.Group as={Row} className="mb-3" controlId="formPreferredCake">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
            Preferred Cake Types
          </Form.Label>
          <Col sm="10">
            {isEditing ? (
              <Form.Control
                as="select"
                multiple
                name="preferredCakeFlavors"
                value={profileInfo.preferredCakeFlavors}
                onChange={handleChange}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
              >
                <option value="Marble">Marble</option>
                <option value="Vanilla">Vanilla</option>
                <option value="Orange">Orange</option>
                <option value="Banana">Banana</option>
                <option value="Pinacolada">Pinacolada</option>
                <option value="Fruit cake">Fruit Cake</option>
                <option value="Lemon">Lemon</option>
                <option value="Red Velvet">Red Velvet</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Black Forest">Black Forest</option>
                <option value="White Forest">White Forest</option>
                <option value="Eggless">Eggless</option>
                <option value="Pineapple">Pineapple</option>
                <option value="Blueberry">Blueberry</option>
                <option value="Coffee">Coffee</option>
                <option value="Cheesecake">Cheesecake</option>
                <option value="Carrot">Carrot</option>
                <option value="Coconut">Coconut</option>
                <option value="Amarula">Amarula</option>
                <option value="Strawberry">Strawberry</option>
              </Form.Control>
            ) : (
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#3e2c41' }}>
                {profileInfo.preferredCakeFlavors.length > 0 ? profileInfo.preferredCakeFlavors.join(', ') : <em style={{ fontSize: '1rem' }}>Please register to update your preferred cake types.</em>}
              </p>
            )}
          </Col>
        </Form.Group>

        {/* Password Fields */}
        {isEditing && (
          <>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  name="password"
                  value={profileInfo.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextConfirmPassword">
              <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>
                Confirm Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={profileInfo.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
                />
              </Col>
            </Form.Group>
          </>
        )}
         
        {/* Edit/Save Buttons */}
        <div className="d-flex justify-content-between mt-4">         

        {isEditing ? (
          <Button type="submit" variant="success" style={{ backgroundColor: '#3e2c41', fontFamily: 'Poppins, sans-serif' }}>
            Save Changes
          </Button>
        ) : (
          <Button onClick={handleEditToggle} variant="primary" style={{ backgroundColor: '#3e2c41', fontFamily: 'Poppins, sans-serif' }}>
            Edit Profile
          </Button>
        )}
        {isEditing && (
          <Button onClick={handleCancel} variant="secondary" style={{ marginLeft: '1rem', fontFamily: 'Poppins, sans-serif' }}>
            Cancel
          </Button>
        )}
       </div>
      </Form>

      {/* Google Login */}
      <div className="mt-4 text-center">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          style={{ marginTop: '20px' }}
        />
      </div>
    </Container>
  );
};
    
   

export default Profile;

