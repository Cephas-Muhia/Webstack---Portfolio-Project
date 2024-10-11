import React, { useState } from 'react';
import '../styles.css'; // Importing the CSS file for styling

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      flavor: 'Chocolate Cake',
      icing: 'Fresh Cream',
      size: 2,
      decorations: ['Sprinkles', 'Candles'],
      price: 1500,
      message: 'Happy Birthday!',
      description: 'I want the cake with a swirl design and chocolate drip.',
      image: '/images/freshcream.jpg', // Path for the first image
      shape: 'Round',
      colorTheme: 'Chocolate Brown',
    },
    {
      id: 2,
      flavor: 'Vanilla Cake',
      icing: 'Soft Icing',
      size: 1.5,
      decorations: ['Flowers'],
      price: 1200,
      message: 'Congratulations!',
      description: 'I would like a classic vanilla cake with floral decoration.',
      image: '/images/softicing.jpg', // Path for the second image
      shape: 'Square',
      colorTheme: 'Vanilla Cream',
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Treat Basket</h1>
      <p className="cart-subheader">Review your selected cakes and customize them before checkout.</p>

      {/* Cart Items List */}
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-content">
                <div className="cart-item-image">
                  <img src={item.image} alt={`${item.flavor} Design`} />
                </div>
                <div className="cart-item-details">
                  <p><strong>Cake Flavor:</strong> {item.flavor}</p>
                  <p><strong>Size:</strong> {item.size} kg</p>
                  <p><strong>Icing:</strong> {item.icing}</p>
                  <p><strong>Shape:</strong> {item.shape}</p>
                  <p><strong>Color Theme:</strong> {item.colorTheme}</p>
                  <p><strong>Message:</strong> {item.message}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Decorations:</strong> {item.decorations.join(', ')}</p>
                  <p><strong>Price:</strong> Ksh {item.price}</p>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(item.id)}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total Price */}
      {cartItems.length > 0 && (
        <div className="text-center">
          <h4>Total Price: Ksh {calculateTotalPrice()}</h4>
        </div>
      )}

      {/* Checkout Button */}
      <div className="text-center mt-4">
        {cartItems.length > 0 && (
          <button className="btn btn-dark" style={{ backgroundColor: '#5a3f2d' }}>
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;

