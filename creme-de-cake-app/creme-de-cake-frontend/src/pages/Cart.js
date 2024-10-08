import React, { useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Chocolate Cake',
      icing: 'Fresh Cream',
      size: 2,
      decorations: ['Sprinkles', 'Candles'],
      price: 1500,
    },
    {
      id: 2,
      name: 'Vanilla Cake',
      icing: 'Soft Icing',
      size: 1.5,
      decorations: ['Flowers'],
      price: 1200,
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container" style={{ backgroundColor: '#e4ab63', minHeight: '100vh' }}>
      <h1 className="text-center text-white">Your Treat Basket</h1>
      <p className="text-center text-white lead">View and manage your selected cakes.</p>

      {/* Cart Items List */}
      <div className="mb-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-white">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>Icing:</strong> {item.icing}<br />
                  <strong>Size:</strong> {item.size} kg<br />
                  <strong>Decorations:</strong> {item.decorations.join(', ')}<br />
                  <strong>Price:</strong> Ksh {item.price}
                </p>
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
          <h4 className="text-white">Total Price: Ksh {calculateTotalPrice()}</h4>
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


