import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles.css';

function Cart() {
  const navigate = useNavigate(); // Initialize navigate for programmatic navigation
  const location = useLocation(); // To get passed state from Customize.js

  // Sample cart items (this ideally come from state or a context)
  const initialCartItems = [
    {
      id: 1,
      name: 'Chocolate Cake',
      icing: 'Fresh Cream',
      size: 2,
      shape: 'Round',
      CelebrationExtras: ['Sprinkles', 'Candles'],
      AdditionalDescription: 'Rich chocolate with layers of fudge.',
      image: '/images/freshcream.jpg',
      customMessage: 'Happy Birthday John!',
      preferredColors: ['Brown', 'Gold'],
      price: 1500,
    },
    {
      id: 2,
      name: 'Vanilla Cake',
      icing: 'Soft Icing',
      size: 1.5,
      shape: 'Square',
      CelebrationExtras: ['Floral Touch'],
      AdditionalDescription: 'Classic vanilla with a hint of buttercream.',
      image: '/images/softicing.jpg',
      customMessage: 'Congratulations!',
      preferredColors: ['White', 'Silver'],
      price: 1200, // Fixed the repeated line issue
    },
  ];

  // Initialize cartItems with initialCartItems
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Check if a custom cake is passed from the Customize.js page
  useEffect(() => {
    if (location.state?.customCake) {
      const newCake = {
        id: cartItems.length + 1, // Increment ID based on current cart size
        name: 'Custom Cake', // Default name for custom cakes
        ...location.state.customCake, // Spread the custom cake details from state
        price: 2000, // Placeholder price, update with real pricing logic later
      };

      // Add the new custom cake to the cart
      setCartItems(prevCartItems => [...prevCartItems, newCake]);
    }
  }, [location.state, cartItems.length]);

  // Function to remove an item from the cart by ID
  const removeItemFromCart = (id) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
  };

  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Define handleEditItem (if you want to enable editing of items)
  const handleEditItem = (item) => {
    navigate('/customize', { state: { item } }); // Navigate to Customize page
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '30px' }}>Treat Basket</h1>
      <p className="text-center" style={{ color: '#3e2c41', marginBottom: '40px' }}>
        Review your selected cakes and customize them before checkout.
      </p>

      {cartItems.length === 0 ? (
        <div className="text-center" style={{ color: '#3e2c41' }}>
          <h4>Your cart is empty. Start adding some delicious cakes!</h4>
        </div>
      ) : (
        <>
          {/* Cart items display */}
          {cartItems.map((item) => (
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
                      <strong>Size:</strong> {item.size} kg<br />
                      <strong>Shape:</strong> {item.shape}<br />
                      <strong>Celebration Extras:</strong> {(item.CelebrationExtras || []).join(', ')}<br /> {/* Safeguard with default empty array */}
                      <strong>Additional Description:</strong> {item.AdditionalDescription}<br />
                      <strong>Custom Message:</strong> {item.customMessage}<br />
                      <strong>Preferred Colors:</strong> {(item.preferredColors || []).join(', ')}<br /> {/* Safeguard with default empty array */}
                      <strong>Price:</strong> Ksh {item.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit and Remove Buttons */}
              <div className="d-flex justify-content-between">
                <button
                  onClick={() => handleEditItem(item)} // Redirect to Customize page
                  className="btn"
                  style={{ backgroundColor: '#4CAF50', color: '#fff' }} // Updated button color
                >
                  Edit Item
                </button>
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
            <h4 style={{ color: '#3e2c41' }}>Total Price: Ksh {calculateTotalPrice()}</h4>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            <Link to="/checkout" className="btn" style={{ backgroundColor: '#3e2c41', color: '#fff' }}>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
