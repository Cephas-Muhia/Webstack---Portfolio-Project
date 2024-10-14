import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
 

//Fetching Profile Data
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      setProfileInfo(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };
  fetchProfile();
}, []);

//Updating Profile
const handleSaveProfile = async () => {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileInfo),
    });
    
    if (response.ok) {
      const updatedProfile = await response.json();
      setProfileInfo(updatedProfile);
      setIsEditing(false);
    } else {
      console.error('Error updating profile');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Google Login Success Handler
const handleGoogleLoginSuccess = async (credentialResponse) => {
  try {
    const result = await fetch('/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),  // Use credential instead of tokenId
    });

    const data = await result.json();
    setProfileInfo({
      name: data.user.name,
      email: data.user.email,
      profilePhoto: data.user.profilePhoto,
    });

  } catch (error) {
    console.error('Google login failed:', error);
  }
};

// Fetch available cake customization options (icing, sizes, flavors, etc.)
export const getCustomizationOptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/customizations/options`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customization options:', error);
    throw error;
  }
};

// Submit the customized cake data to backend
export const submitCustomCake = async (customCake) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customizations`, customCake);
    return response.data;
  } catch (error) {
    console.error('Error submitting custom cake:', error);
    throw error;
  }
};

// Get cake details by ID (used when editing an existing customization)
export const getCakeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cakes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cake details:', error);
    throw error;
  }
};
