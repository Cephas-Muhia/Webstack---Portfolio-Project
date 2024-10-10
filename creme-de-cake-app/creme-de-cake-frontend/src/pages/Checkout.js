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
    phone: '',
    address: '',
    specialInstructions: '',
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);

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
    setOrderConfirmed(true);
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      {!orderConfirmed ? (
        <>
          <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '30px' }}>
            Proceed to Checkout Delight
          </h1>
          <p className="text-center" style={{ color: '#3e2c41', marginBottom: '40px' }}>
            Confirm your order and payment details below.
          </p>

          {/* Order Summary */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41' }}>Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3" style={{ backgroundColor: '#fff' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#3e2c41' }}>{item.name}</h5>
                  <p className="card-text" style={{ color: '#3e2c41' }}>
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
            <h3 style={{ color: '#3e2c41' }}>Customer Information</h3>
            <form>
              <div className="form-group">
                <label htmlFor="name" style={{ color: '#3e2c41' }}>Full Name</label>
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
                <label htmlFor="email" style={{ color: '#3e2c41' }}>Email Address</label>
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
                <label htmlFor="phone" style={{ color: '#3e2c41' }}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={customerInfo.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" style={{ color: '#3e2c41' }}>Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  value={customerInfo.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="specialInstructions" style={{ color: '#3e2c41' }}>Special Delivery Instructions</label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  className="form-control"
                  value={customerInfo.specialInstructions}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>

          {/* Payment Section */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41' }}>Payment Method</h3>
            <div>
              <label style={{ color: '#3e2c41' }}>
                <input type="radio" name="payment" /> Mpesa
              </label><br />
              <label style={{ color: '#3e2c41' }}>
                <input type="radio" name="payment" /> Cash on Delivery
              </label><br />
            </div>
          </div>

          {/* Total Price */}
          <div className="text-center mb-4">
            <h4 style={{ color: '#3e2c41' }}>Total Price: Ksh {calculateTotalPrice()}</h4>
          </div>

          {/* Confirm Order Button */}
          <div className="text-center mt-4">
            <button
              className="btn"
              style={{ backgroundColor: '#3e2c41', color: '#fff' }}
              onClick={handleOrderConfirmation}
            >
              Confirm Order
            </button>
          </div>
        </>
      ) : (
        <div className="order-summary">
          <h3 style={{ color: '#3e2c41' }}>Order Summary</h3>
          <div>
            <h4 style={{ color: '#3e2c41' }}>Cake Details</h4>
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3" style={{ backgroundColor: '#fff' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#3e2c41' }}>{item.name}</h5>
                  <p className="card-text" style={{ color: '#3e2c41' }}>
                    <strong>Icing:</strong> {item.icing}<br />
                    <strong>Size:</strong> {item.size} kg<br />
                    <strong>Decorations:</strong> {item.decorations.join(', ')}<br />
                    <strong>Quantity:</strong> {cartItems.length}<br />
                    <strong>Price Breakdown:</strong> Ksh {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ color: '#3e2c41' }}>Customer Information</h4>
          <p style={{ color: '#3e2c41' }}><strong>Name:</strong> {customerInfo.name}</p>
          <p style={{ color: '#3e2c41' }}><strong>Email:</strong> {customerInfo.email}</p>
          <p style={{ color: '#3e2c41' }}><strong>Phone:</strong> {customerInfo.phone}</p>
          <p style={{ color: '#3e2c41' }}><strong>Address:</strong> {customerInfo.address}</p>
          <p style={{ color: '#3e2c41' }}><strong>Special Instructions:</strong> {customerInfo.specialInstructions || 'None'}</p>

          <h4 style={{ color: '#3e2c41' }}>Total Price: Ksh {calculateTotalPrice()}</h4>
        </div>
      )}
    </div>
  );
}

export default Checkout;

