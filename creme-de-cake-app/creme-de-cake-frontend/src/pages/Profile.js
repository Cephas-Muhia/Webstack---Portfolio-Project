import React, { useState } from 'react';

function Profile() {
  const [profileInfo, setProfileInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Sweet Street, Cake Town',
    profilePicture: '/images/default-avatar.png', // Placeholder image
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newInfo, setNewInfo] = useState({
    name: profileInfo.name,
    email: profileInfo.email,
    address: profileInfo.address,
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
    setProfileInfo({
      ...profileInfo,
      ...newInfo,
    });
    setIsEditing(false);
  };

  return (
    <div className="container" style={{ backgroundColor: '#e4ab63', minHeight: '100vh' }}>
      <h1 className="text-center text-white mt-4">Your Profile</h1>
      <p className="text-center text-white">Manage your account and orders.</p>

      <div className="text-center">
        <img
          src={profileInfo.profilePicture}
          alt="Profile"
          className="rounded-circle"
          style={{ width: '150px', height: '150px' }}
        />
      </div>

      <div className="text-center text-white mt-4">
        <h3>{isEditing ? 'Edit Your Profile' : 'Profile Information'}</h3>
        <div>
          <strong>Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={newInfo.name}
              onChange={handleChange}
              className="form-control mb-2"
            />
          ) : (
            <p>{profileInfo.name}</p>
          )}
        </div>

        <div>
          <strong>Email:</strong>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={newInfo.email}
              onChange={handleChange}
              className="form-control mb-2"
            />
          ) : (
            <p>{profileInfo.email}</p>
          )}
        </div>

        <div>
          <strong>Address:</strong>
          {isEditing ? (
            <textarea
              name="address"
              value={newInfo.address}
              onChange={handleChange}
              className="form-control mb-2"
            />
          ) : (
            <p>{profileInfo.address}</p>
          )}
        </div>

        <div className="mt-3">
          {isEditing ? (
            <button className="btn btn-dark" onClick={handleSave}>
              Save Changes
            </button>
          ) : (
            <button className="btn btn-dark" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;


