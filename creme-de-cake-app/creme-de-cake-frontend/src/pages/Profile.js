import React, { useState } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import '../styles.css'; // additional styling if needed

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePhoto: null,
    birthday: '',
    address: '',
    preferredCake: '',
    password: '',
    confirmPassword: ''
  });

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

  const handleGoogleLoginSuccess = (response) => {
    setProfileInfo({
      name: response.profileObj.name,
      email: response.profileObj.email,
      phoneNumber: '',
      profilePhoto: response.profileObj.imageUrl,
      birthday: '',
      address: '',
      preferredCake: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleGoogleLoginFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <Container style={{ padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2.5rem', color: '#3e2c41', textAlign: 'center' }}>
        My Profile
      </h2>

      {/* Profile Photo */}
      <Row className="text-center mb-4">
        <Col>
          <img
            src={profileInfo.profilePhoto || '/path/to/default-avatar.png'} // Default avatar image
            alt="Profile"
            style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', marginBottom: '1rem' }}
          />
          {isEditing && (
            <Form.Group controlId="formProfilePhoto" className="text-center">
              <Form.Label style={{ fontFamily: 'Poppins, sans-serif', color: '#3e2c41' }}>Upload Profile Photo</Form.Label>
              <Form.Control type="file" onChange={handlePhotoUpload} style={{ display: 'block', margin: 'auto' }} />
            </Form.Group>
          )}
        </Col>
      </Row>

      <Form>
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
                type="text"
                name="preferredCake"
                value={profileInfo.preferredCake}
                onChange={handleChange}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
                placeholder="e.g., Chocolate, Vanilla"
              />
            ) : (
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#3e2c41' }}>
                {profileInfo.preferredCake || <em style={{ fontSize: '1rem' }}>Please register to update your cake preferences.</em>}
              </p>
            )}
          </Col>
        </Form.Group>

        {/* Password and Confirm Password Fields */}
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
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
                  placeholder="Enter a new password"
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
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem' }}
                  placeholder="Confirm your new password"
                />
              </Col>
            </Form.Group>
          </>
        )}

        {/* Google Login */}
        <Row className="mb-3 text-center">
          <Col>
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
          </Col>
        </Row>

        {/* Edit Button */}
        <Row className="text-center">
          <Col>
            <Button onClick={handleEditToggle} style={{ backgroundColor: '#3e2c41', color: 'white', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}>
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Profile;

