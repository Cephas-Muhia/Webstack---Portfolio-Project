import React, { useState, useEffect } from 'react';
import '../styles.css'; // Assuming the same styles apply here

function Checkout() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Chocolate Cake',
      icing: 'Fresh Cream',
      size: 2,
      shape: 'Round',
      celebrationExtras: ['Sprinkles', 'Candles'],
      additionalDescription: 'Rich chocolate with layers of fudge.',
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
      celebrationExtras: ['Floral Touch'],
      additionalDescription: 'A classic vanilla cake with a soft touch.',
      image: '/images/softicing.jpg',
      customMessage: 'Happy Anniversary!',
      preferredColors: ['White', 'Pink'],
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

  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDate, setOrderDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 16); 
    setOrderDate(currentDate);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleOrderConfirmation = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    setOrderConfirmed(true);
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh', padding: '20px' }}>
      {!orderConfirmed ? (
        <>
          <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '30px' }}>
            Checkout Delight
          </h1>
          <h2 className="text-center" style={{ color: '#3e2c41', marginTop: '10px', fontSize: '24px' }}>
            Finalize Your Sweet Journey
          </h2>
          <p className="text-center" style={{ color: '#3e2c41', marginBottom: '40px', fontSize: '16px' }}>
            Confirm your order and payment details below.
          </p>

          {/* Order Summary */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41', borderBottom: '2px solid #3e2c41', paddingBottom: '5px' }}>Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3 shadow" style={{ borderRadius: '10px' }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={item.image} alt={item.name} className="img-fluid rounded-start" style={{ maxWidth: '200px', padding: '10px' }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title" style={{ color: '#3e2c41' }}>{item.name}</h5>
                      <p className="card-text" style={{ color: '#3e2c41' }}>
                        <strong>Icing:</strong> {item.icing}<br />
                        <strong>Size:</strong> {item.size} kg<br />
                        <strong>Shape:</strong> {item.shape}<br />
                        <strong>Celebration Extras:</strong> {item.celebrationExtras.join(', ')}<br />
                        <strong>Additional Description:</strong> {item.additionalDescription}<br />
                        <strong>Custom Message:</strong> {item.customMessage}<br />
                        <strong>Preferred Colors:</strong> {item.preferredColors.join(', ')}<br />
                        <strong>Price:</strong> Ksh {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Information Form */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41', borderBottom: '2px solid #3e2c41', paddingBottom: '5px' }}>Customer Information</h3>
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
                  rows="2"
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
                  rows="2"
                />
              </div>
            </form>
          </div>

          {/* Delivery/Pickup Date and Time */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41', borderBottom: '2px solid #3e2c41', paddingBottom: '5px' }}>Delivery/Pickup Date and Time</h3>
            <input
              type="datetime-local"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Payment Section */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41', borderBottom: '2px solid #3e2c41', paddingBottom: '5px' }}>Payment Method</h3>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="payment"
                value="Mpesa"
                checked={paymentMethod === 'Mpesa'}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>
                Mpesa
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>
                Cash on Delivery
              </label>
            </div>
          </div>

            {/* Total Price and Order Confirmation */}
        <div className="d-flex justify-content-between align-items-center">
     <h4 style={{ color: '#3e2c41', fontWeight: 'bold' }}>Total: Ksh {calculateTotalPrice()}</h4>
     <button
    className="btn btn-primary"
    onClick={handleOrderConfirmation}
    style={{ backgroundColor: '#3e2c41', borderColor: '#4CAF50' }}>
    Finalize Your Sweet Order
  </button>
</div>
    ) : (
      <div className="text-center mt-5">
    <h2 style={{ color: '#3e2c41', fontSize: '24px', fontWeight: 'bold' }}>🎉 Your Order is Confirmed! 🎉</h2>
      <p style={{ color: '#3e2c41', fontSize: '18px', marginBottom: '20px' }}>
       Thank you for choosing us! <br />
      </p>
       <p style={{ color: '#3e2c41', fontSize: '16px', fontStyle: 'italic' }}>
      Your order is being processed, and you'll receive an email confirmation shortly!
    </p>
    <p style={{ color: '#3e2c41', fontSize: '16px' }}>
      <strong>
        Haven’t updated your profile yet? Tap the button to register and unlock personalized cakes, quicker checkouts, and exclusive treats just for you! 🍰✨
      </strong>
    </p>
    <Link
      to="/profile"
      className="btn"
      style={{ backgroundColor: '#4CAF50', color: '#fff', margin: '20px 0' }}>
      Create Your Profile
    </Link>
    <img
      src="/images/logo.png"
      alt="Company Logo"
      style={{ width: '150px', margin: '20px 0' }} // Adjust the width and margin as needed
    />
  </div>
)}
 
      


export default Checkout;
