import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Customize() {
  const location = useLocation();
  const navigate = useNavigate();

  // All available flavors from the Catalogue.js
  const availableFlavors = [
    'Marble', 'Vanilla', 'Orange', 'Banana', 'Pinacolada', 'Fruit', 
    'Lemon', 'Red Velvet', 'Chocolate', 'Black Forest', 'White Forest',
    'Eggless', 'Pineapple', 'Blueberry', 'Coffee', 'Cheesecake', 
    'Carrot', 'Coconut', 'Fudge', 'Mint', 'Chocolate Chip', 
    'Royal Velvet', 'Amarula', 'Strawberry'
  ];

  // Initialize form state with all required inputs
  const [customization, setCustomization] = useState({
    flavors: [],
    customFlavor: '',
    sizeInKgs: '1',
    decorations: [],
    icingType: '',
    shape: '',
    message: '',
    additionalDescription: '',
    preferredColors: [],
    designImage: null,
  });

  // Error state
  const [error, setError] = useState('');

  // Pre-fill flavor if passed from Catalogue.js
  useEffect(() => {
    if (location.state && location.state.flavor) {
      setCustomization((prev) => ({ ...prev, flavors: [location.state.flavor] }));
    }
  }, [location.state]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomization((prev) => ({ ...prev, [name]: value }));
  };

  // Handle flavor selection
  const handleFlavorChange = (flavor) => {
    setCustomization((prev) => {
      const updatedFlavors = prev.flavors.includes(flavor)
        ? prev.flavors.filter((f) => f !== flavor)
        : [...prev.flavors, flavor];
      if (updatedFlavors.length > 3) {
        updatedFlavors.pop(); // Restrict to 3 flavors
      }
      return { ...prev, flavors: updatedFlavors };
    });
  };

  // Handle checkbox selections for decorations and extras
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCustomization((prev) => ({
      ...prev,
      decorations: checked
        ? [...prev.decorations, value]
        : prev.decorations.filter((item) => item !== value),
    }));
  };

  // Handle file input change for cake design image
  const handleFileChange = (e) => {
    setCustomization((prev) => ({ ...prev, designImage: e.target.files[0] }));
  };

  // Form validation
  const validateForm = () => {
    if (customization.flavors.length === 0 && !customization.customFlavor) {
      setError('Please select or enter at least one flavor.');
      return false;
    }
    if (!customization.icingType) {
      setError('Please select an icing type.');
      return false;
    }
    if (!customization.shape) {
      setError('Please select a cake shape.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      Object.keys(customization).forEach((key) => {
        if (key === 'designImage' && customization[key]) {
          formData.append(key, customization[key]);
        } else if (Array.isArray(customization[key])) {
          customization[key].forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, customization[key]);
        }
      });

      // Send data to backend
      const response = await axios.post(
        'http://localhost:5000/api/customizations',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 201) {
        alert('Customization saved successfully!');
        navigate('/cart', { state: { customizationId: response.data._id } });
      }
    } catch (error) {
      console.error('Error saving customization:', error);
      setError('Failed to save customization. Please try again.');
    }
  };

  // Handle form reset
  const handleReset = () => {
    setCustomization({
      flavors: [],
      customFlavor: '',
      sizeInKgs: '1',
      decorations: [],
      icingType: '',
      shape: '',
      message: '',
      additionalDescription: '',
      preferredColors: [],
      designImage: null,
    });
    setError('');
  };


  return (
    <div
      className="container mt-5 p-4"
      style={{
        backgroundColor: '#f5e1a4',
        minHeight: '100vh',
        borderRadius: '8px',
      }}
    >
      <h1 className="text-center" style={{ color: '#3e2c41' }}>
        Customize Your Cake
      </h1>
      <p
        className="text-center lead mb-4"
        style={{ color: '#3e2c41', fontStyle: 'italic' }}
      >
        Unleash Your Creativity! 🍰✨ Design the cake of your dreams by choosing your icing, size, decorations, colors, and more. Make it uniquely yours—because every celebration deserves a custom touch!
      </p>

      {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Flavor Selection */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#3e2c41' }}>
              Choose Cake Flavor(s) (Up to 3)
            </label>
            <div>
              {availableFlavors.map((flavor, index) => (
                <div key={index} className="form-check form-check-inline">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`flavor-${flavor}`}
                    value={flavor}
                    checked={customization.flavors.includes(flavor)}
                    onChange={() => handleFlavorChange(flavor)}
                  />
                  <label className="form-check-label" htmlFor={`flavor-${flavor}`}>
                    {flavor}
                  </label>
                </div>
              ))}
            </div>
            {/* Custom Flavor Input */}
            <input
              type="text"
              className="form-control mt-2"
              name="customFlavor"
              value={customization.customFlavor}
              onChange={handleInputChange}
              placeholder="Enter your custom flavor"
            />
          </div>

          {/* Icing Type */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#3e2c41' }}>
              Select Icing
            </label>
            <select
              className="form-select"
              name="icingType"
              value={customization.icingType}
              onChange={handleInputChange}
            >
              <option value="">Choose...</option>
              <option value="Soft icing">Soft icing</option>
              <option value="Hard icing">Hard icing</option>
              <option value="Fresh cream">Fresh cream</option>
            </select>
          </div>

          {/* Cake Size */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#3e2c41' }}>
              Select Cake Size (kg)
            </label>
            <input
              type="range"
              className="form-range"
              name="sizeInKgs"
              min="0.5"
              max="15"
              step="0.5"
              value={customization.sizeInKgs}
              onChange={handleInputChange}
            />
            <p className="text-center" style={{ color: '#3e2c41' }}>
              {customization.sizeInKgs} kg
            </p>
          </div>
        </div>

        {/* Cake Shape Selection */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Select Cake Shape
          </label>
          <select
            className="form-select"
            name="shape"
            value={customization.shape}
            onChange={handleInputChange}
            style={{ borderColor: '#3e2c41' }}
          >
            <option value="Round">Round</option>
            <option value="Square">Square</option>
            <option value="Stacked">Stacked</option>
            <option value="HeartShape">Heart Shape</option>
          </select>
        </div>

        {/* Decoration Extras */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Choose Celebration Extras
          </label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Sprinkles"
                checked={customization.decorations.includes('Sprinkles')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>
                Sprinkles (Ksh300)
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Flowers"
                checked={customization.decorations.includes('Flowers')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>
                Flowers (Ksh400)
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Candles"
                checked={customization.decorations.includes('Candles')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>
                Candles (Ksh250)
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Edible Glitter"
                checked={customization.decorations.includes('Edible Glitter')}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>
                Edible Glitter (Ksh500)
              </label>
            </div>
          </div>
        </div>

        {/* Preferred Colors */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Preferred Cake Colors
          </label>
          <input
            type="text"
            className="form-control"
            name="preferredColors"
            value={customization.preferredColors.join(', ')}
            onChange={(e) => {
              const colors = e.target.value.split(',').map((item) => item.trim());
              setCustomization((prev) => ({ ...prev, preferredColors: colors }));
            }}
            placeholder="Enter preferred colors (comma separated)"
          />
        </div>

        {/* Custom Message */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Custom Message
          </label>
          <textarea
            className="form-control"
            name="message"
            value={customization.message}
            onChange={handleInputChange}
            rows="3"
            placeholder="Enter your custom message"
          />
        </div>

        {/* Cake Design Image */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Upload Cake Design Image
          </label>
          <input
            type="file"
            className="form-control"
            name="designImage"
            onChange={handleFileChange}
          />
        </div>
       
        {/* Additional Description */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Additional Description
          </label>
          <textarea
            className="form-control"
            name="additionalDescription"
            value={customization.additionalDescription}
            onChange={handleInputChange}
            rows="3"
            placeholder="Any extra details for your cake?"
          />
        </div>
       

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset Customization
          </button>
          <button type="submit" className="btn btn-primary">
            Submit Customized Cake
          </button>
        </div>
      </form>
    </div>
  );
}

export default Customize;

