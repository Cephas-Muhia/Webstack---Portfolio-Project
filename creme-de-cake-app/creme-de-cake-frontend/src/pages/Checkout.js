import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles.css'; 

function Checkout() {
  const { orderId } = useParams(); 
  const [cartItems, setCartItems] = useState([]);
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
    
        // Fetch cake details from backend
    const fetchCakeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        const orderData = response.data;

        // Update cart items with fetched data
        setCartItems([
          {
            id: orderData.cakeId,
            name: orderData.cakeName,
            icing: orderData.icing,
            size: orderData.size,
            shape: orderData.shape,
            celebrationExtras: orderData.CelebrationExtras.map(extra => extra.name),
            additionalDescription: orderData.AdditionalDescription,
            image: orderData.image,
            customMessage: orderData.customMessage,
            preferredColors: orderData.preferredColors,
            price: orderData.totalPrice, // Use the price from the backend
          },
        ]);

        // Update customer info if needed
        setCustomerInfo({
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          address: orderData.deliveryAddress,
          specialInstructions: orderData.specialInstructions || '',
        });
      } catch (error) {
        console.error('Error fetching cake details:', error);
      }
    };

    fetchCakeDetails();
  }, [orderId]);

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
              {/* Customer info fields */}
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
            <select
              className="form-control"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="mpesa">M-Pesa</option>
              <option value="card">Credit/Debit Card</option>
              <option value="cash">Cash on Delivery</option>
            </select>
          </div>

          {/* Confirm Button */}
          <button
            className="btn btn-primary btn-lg"
            style={{ backgroundColor: '#3e2c41', borderColor: '#3e2c41' }}
            onClick={handleOrderConfirmation}
          >
            Confirm Order
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 style={{ color: '#3e2c41' }}>🎉 Order Confirmed! 🎉</h2>
          <p style={{ color: '#3e2c41' }}>Thank you for choosing Creme de Cake.</p>
          <p style={{ color: '#3e2c41' }}>You will receive email confirmation shortly!.</p>
          <Link to="/" className="btn btn-primary btn-lg" style={{ backgroundColor: '#3e2c41', borderColor: '#3e2c41' }}>
            Return to Home
          </Link>
                   {/* Ask to register profile */}
          <p style={{ color: '#4CAF50', fontSize: '22px', marginTop: '20px' }}>
            Want to register your profile for faster future orders? Click below to complete your profile!
          </p>
          <Link to="/profile" className="btn btn-primary" style={{ backgroundColor: '#00BFFF', borderColor: '#00BFFF' }}>
            Complete Your Profile
          </Link>

          {/* Company Logo */}
          <div className="mt-4" style={{ marginTop: '200px' }}>
            <img src="/images/logo.png" alt="Company Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

