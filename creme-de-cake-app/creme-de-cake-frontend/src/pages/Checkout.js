import React, { useState, useEffect } from 'react';
import '../styles.css'; // Assuming the same styles apply here

function Checkout() {
  // Cart items will be passed in from the Cart page or fetched from a global state
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
      image: '/images/vanilla.jpg',
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

  const [orderDate, setOrderDate] = useState(''); // State to hold order date and time
  const [deliveryDate, setDeliveryDate] = useState(''); // State to hold delivery date and time

  useEffect(() => {
    // Set the current date and time for the order
    const currentDate = new Date().toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
    setOrderDate(currentDate); // Set order date to current date and time
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
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      {!orderConfirmed ? (
        <>
          <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '30px' }}>
            Checkout Delight
          </h1>
         <h2 className="text-center" style={{ color: '#3e2c41', marginTop: '30px' }}>
            Finalize Your Sweet journey
          </h2>
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
                  <img src={item.image} alt={item.name} className="img-fluid" style={{ maxWidth: '200px', marginBottom: '20px' }} />
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

          {/* Delivery/Pickup Date and Time */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41' }}>Delivery/Pickup Date and Time</h3>
            <input
              type="datetime-local"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)} // Update delivery date
              className="form-control"
            />
          </div>

          {/* Payment Section */}
          <div className="mb-4">
            <h3 style={{ color: '#3e2c41' }}>Payment Method</h3>
            <div>
              <label style={{ color: '#3e2c41' }}>
                <input
                  type="radio"
                  name="payment"
                  value="Mpesa"
                  checked={paymentMethod === 'Mpesa'}
                  onChange={handlePaymentMethodChange}
                /> Mpesa
              </label><br />
              <label style={{ color: '#3e2c41' }}>
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={handlePaymentMethodChange}
                /> Cash on Delivery
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
        <div className="mt-4 text-center">
          <h1 style={{ color: '#3e2c41' }}>Order Confirmed!</h1>
          <p style={{ color: '#3e2c41' }}>Your order has been successfully placed.</p>
          <p style={{ color: '#3e2c41' }}><strong>Order Date & Time:</strong> {orderDate}</p>
          <p style={{ color: '#3e2c41' }}><strong>Delivery/Pickup Date & Time:</strong> {deliveryDate}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;

