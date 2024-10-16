import axios from 'axios';
 
// Create a pre-configured instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  
  headers: {
    'Content-Type': 'application/json',
  },
});


// Function to get cart items
export const getCartItems = async () => {
  try {
    const response = await api.get('/cart'); 
    return response.data;  // Return the data received from the backend
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;  // Rethrow the error to be handled by the calling function
  }
};

// Function to add an item to the cart
export const addToCart = async (item) => {
  try {
    const response = await api.post('/cart', item);  // Post item to the cart
    return response.data;  // Return the updated cart data
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;  // Rethrow the error for handling
  }
};

// Function to remove an item from the cart
export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`);  // Delete item by ID
    return response.data;  // Return the updated cart data
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;  // Rethrow the error for handling
  }
};

// Function to clear the cart
export const clearCart = async () => {
  try {
    const response = await api.delete('/cart');  // Clear the entire cart
    return response.data;  // Return confirmation or updated cart data
  } catch (error) {
    console.error('Error clearing the cart:', error);
    throw error;  // Rethrow the error for handling
  }
};


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
