import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles.css';

function Cart() {
  const navigate = useNavigate();
  const [customizations, setCustomizations] = useState([]); // Store fetched customizations
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch saved customizations from the backend
  useEffect(() => {
    const fetchCustomizations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customizations'); // Fetch customizations
        const fetchedCustomizations = response.data || [];
        console.log('Fetched customizations:', fetchedCustomizations); // Log for debugging
        setCustomizations(fetchedCustomizations);
        calculateTotalPrice(fetchedCustomizations); // Calculate total price
      } catch (error) {
        console.error('Error fetching customizations:', error);
      }
    };

    fetchCustomizations();
  }, []);

  // Function to calculate total price based on customizations
  const calculateTotalPrice = (customizations) => {
    let price = 0;
    customizations.forEach(item => {
      price += item.price || 2000; // Assume default price if not provided
    });
    setTotalPrice(price);
  };

  // Handle redirect to customization page for adding another custom cake
  const addAnotherCustomization = () => {
    navigate('/customize'); // Redirect to customization page
  };

  // Handle proceeding to checkout
  const proceedToCheckout = () => {
    navigate('/checkout', { state: { customizations } }); // Navigate to checkout with customizations
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '30px' }}>Treat Basket</h1>
      <p className="text-center" style={{ color: '#3e2c41', marginBottom: '40px' }}>
        Take a moment to review your sweet selections and add the perfect finishing touches before checkout! 🍰✨ Customize your cakes to make them truly yours.
      </p>

      {customizations.length === 0 ? (
        <div className="text-center" style={{ color: '#3e2c41' }}>
          <h4>Your treat basket is feeling a bit lonely! 🍰 Start adding your favorite cakes and sweet creations to make your celebration extra special.</h4>
          <button
            onClick={() => navigate('/customize')}
            className="btn mt-4"
            style={{ backgroundColor: '#3e2c41', color: '#fff' }}
          >
            Customize Your Cake
          </button>
        </div>
      ) : (
        <>
          {/* Customization Items */}
          {customizations.map((item) => (
            <div key={item._id} className="card mb-3" style={{ backgroundColor: '#fff', border: '1px solid #3e2c41' }}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  {/* Display designImage if available */}
                  {item.designImage ? (
                    <img src={item.designImage} className="card-img" alt="Custom Cake Design" />
                  ) : (
                    <div style={{ height: '150px', backgroundColor: '#f0f0f0' }} />
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title" style={{ color: '#3e2c41' }}>Custom Cake</h5>
                    <p className="card-text" style={{ color: '#3e2c41' }}>
                      <strong>Flavor:</strong> {item.flavor}<br />
                      {item.customFlavor && <><strong>Custom Flavor:</strong> {item.customFlavor}<br /></>}
                      <strong>Size:</strong> {item.sizeInKgs} kg<br />
                      <strong>Icing:</strong> {item.icingType}<br />
                      <strong>Shape:</strong> {item.shape}<br />
                      <strong>Celebration Extras:</strong> {(item.celebrationExtras || []).join(', ')}<br />
                      <strong>Custom Message:</strong> {item.message}<br />
                      {item.additionalDescription && <><strong>Additional Description:</strong> {item.additionalDescription}<br /></>}
                      {item.preferredColors && <><strong>Preferred Colors:</strong> {item.preferredColors}<br /></>}
                      <strong>Price:</strong> Ksh {item.price || 2000} {/* Assume default price */}
                    </p>
                  </div>
                </div>
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

