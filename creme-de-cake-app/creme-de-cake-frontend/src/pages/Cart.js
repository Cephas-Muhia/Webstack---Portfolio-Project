import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import '../styles.css';

function Cart() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]); // Ensure cartItems is initialized as an array
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items from the backend on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart'); // Fetch cart data from backend
        const items = response.data || []; // Ensure response is always an array
        console.log('Fetched cart items:', items); // Log the fetched data for debugging
        setCartItems(items);
        calculateTotalPrice(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Add new custom cake from Customize.js page
  useEffect(() => {
    if (location.state?.customCake) {
      const newCake = {
        id: cartItems.length + 1,
        name: 'Custom Cake',
        ...location.state.customCake,
        price: 2000,
      };
      const updatedCartItems = [...cartItems, newCake];
      setCartItems(updatedCartItems);
      calculateTotalPrice(updatedCartItems);
      saveCartToDB(updatedCartItems); // Save to database
    }
  }, [location.state, cartItems]);

  // Function to calculate total price of all items in the cart
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price || 0), 0); // Ensure item.price exists
    setTotalPrice(total);
  };

  // Function to save cart items to MongoDB
  const saveCartToDB = async (cart) => {
    try {
      await axios.post('http://localhost:5000/api/cart', { cart }); // Save cart items in backend
    } catch (error) {
      console.error('Error saving cart to database:', error);
    }
  };

  // Remove item from cart by ID and update in MongoDB
  const removeItemFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
    saveCartToDB(updatedCart);
  };

  // Handle adding another custom cake
  const addAnotherCustomization = () => {
    navigate('/customize'); // Redirect to customization page
  };

  // Handle proceeding to checkout
  const proceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems } }); // Navigate to checkout with cart data
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '30px' }}>Treat Basket</h1>
      <p className="text-center" style={{ color: '#3e2c41', marginBottom: '40px' }}>
        Review your selected cakes and customize them before checkout.
      </p>

      {Array.isArray(cartItems) && cartItems.length === 0 ? (
        <div className="text-center" style={{ color: '#3e2c41' }}>
          <h4>Your cart is empty. Start adding some delicious cakes!</h4>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          {Array.isArray(cartItems) && cartItems.map((item) => (
            <div key={item.id} className="card mb-3" style={{ backgroundColor: '#fff', border: '1px solid #3e2c41' }}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={item.image} className="card-img" alt={item.name} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#3e2c41' }}>{item.name}</h5>
                    <p className="card-text" style={{ color: '#3e2c41' }}>
                      <strong>Icing:</strong> {item.icing}<br />
                      <strong>Size:</strong> {item.sizeInKgs} kg<br />
                      <strong>Shape:</strong> {item.shape}<br />
                      <strong>Celebration Extras:</strong> {(item.CelebrationExtras || []).join(', ')}<br />
                      <strong>Additional Description:</strong> {item.AdditionalDescription}<br />
                      <strong>Custom Message:</strong> {item.message}<br />
                      <strong>Preferred Colors:</strong> {(item.preferredColors || []).join(', ')}<br />
                      <strong>Price:</strong> Ksh {item.price}
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  onClick={() => removeItemFromCart(item.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="text-center mb-4">
            <h4 style={{ color: '#3e2c41' }}>Total Price: Ksh {totalPrice}</h4>
          </div>

          {/* Add Another Customization Button */}
          <div className="text-center mb-4">
            <button onClick={addAnotherCustomization} className="btn" style={{ backgroundColor: '#3e2c41', color: '#fff' }}>
              Add Another Customization
            </button>
          </div>

          {/* Proceed to Checkout Button */}
          <div className="text-center">
            <button onClick={proceedToCheckout} className="btn" style={{ backgroundColor: '#3e2c41', color: '#fff' }}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

