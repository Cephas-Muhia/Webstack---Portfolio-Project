import React, { useState } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
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

  const handleGoogleLoginSuccess = (response) => {
    console.log(response.profileObj);
    setProfileInfo({
      name: response.profileObj.name,
      email: response.profileObj.email,
      phoneNumber: '',
    });
  };

  const handleGoogleLoginFailure = (response) => {
    console.error('Google login failed:', response);
  };

  return (
    <Container style={{ backgroundColor: '#f5e1a4', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
      <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', color: '#5a3f2d', textAlign: 'center' }}>
        My Profile
      </h2>

      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#5a3f2d' }}>
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
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#5a3f2d' }}>
                {profileInfo.name || 'Please register to update your name.'}
              </p>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#5a3f2d' }}>
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
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#5a3f2d' }}>
                {profileInfo.email || 'Please register to update your email.'}
              </p>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPhoneNumber">
          <Form.Label column sm="2" style={{ fontFamily: 'Poppins, sans-serif', color: '#5a3f2d' }}>
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
              <p className="form-control-plaintext" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#5a3f2d' }}>
                {profileInfo.phoneNumber || 'Please register to update your phone number.'}
              </p>
            )}
          </Col>
        </Form.Group>

        <Row className="mb-3">
          <Col sm="12" className="text-center">
            <Button
              variant="outline-secondary"
              onClick={handleEditToggle}
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#5a3f2d', borderColor: '#5a3f2d' }}
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </Button>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm="12" className="text-center">
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.2rem', color: '#5a3f2d' }}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Profile;

