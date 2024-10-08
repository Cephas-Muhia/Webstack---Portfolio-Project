import React, { useState } from 'react';

function Checkout() {
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

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleOrderConfirmation = () => {
    // Here you would handle order submission, like sending the data to the backend.
    alert('Your order has been confirmed!');
  };

  return (
    <div className="container" style={{ backgroundColor: '#e4ab63', minHeight: '100vh' }}>
      <h1 className="text-center text-white">Proceed to Checkout Delight</h1>
      <p className="text-center text-white lead">Confirm your order and payment.</p>

      {/* Order Summary */}
      <div className="mb-4">
        <h3 className="text-white">Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
                <strong>Icing:</strong> {item.icing}<br />
                <strong>Size:</strong> {item.size} kg<br />
                <strong>Decorations:</strong> {item.decorations.join(', ')}<br />
                <strong>Price:</strong> Ksh {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Information Form */}
      <div className="mb-4">
        <h3 className="text-white">Customer Information</h3>
        <form>
          <div className="form-group">
            <label className="text-white" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={customerInfo.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={customerInfo.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-white" htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              name="address"
              className="form-control"
              value={customerInfo.address}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </div>

      {/* Payment Section */}
      <div className="mb-4">
        <h3 className="text-white">Payment Method</h3>
        <div>
          <label className="text-white">
            <input type="radio" name="payment" /> Credit/Debit Card
          </label>
          <br />
          <label className="text-white">
            <input type="radio" name="payment" /> Cash on Delivery
          </label>
        </div>
      </div>

      {/* Total Price */}
      <div className="text-center mb-4">
        <h4 className="text-white">Total Price: Ksh {calculateTotalPrice()}</h4>
      </div>

      {/* Confirm Order Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-dark"
          style={{ backgroundColor: '#5a3f2d' }}
          onClick={handleOrderConfirmation}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;

