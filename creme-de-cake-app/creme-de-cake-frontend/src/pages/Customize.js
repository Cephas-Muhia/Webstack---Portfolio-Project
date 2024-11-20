import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Customize() {
  const location = useLocation();
  const navigate = useNavigate();

  // State for customization form
  const [customization, setCustomization] = useState({
    flavor: '',
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

  // Populate flavor if passed from Catalogue.js
  useEffect(() => {
    if (location.state && location.state.flavor) {
      setCustomization((prev) => ({ ...prev, flavor: location.state.flavor }));
    }
  }, [location.state]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomization((prev) => ({ ...prev, [name]: value }));
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
    if (!customization.flavor && !customization.customFlavor) {
      setError('Please select or enter a flavor for your cake.');
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
      flavor: location.state?.flavor || '',
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

       {/* Cake Flavor Selection */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Select Up to 3 Cake Flavors</label>
          <select multiple className="form-select" value={flavors} onChange={handleFlavorChange}>
            <option value="Vanilla">Vanilla</option>
            <option value="Strawberry">Strawberry</option>
            <option value="Marble">Marble</option>
            <option value="Red Velvet">Red Velvet</option>
            <option value="Black Forest">Black Forest</option>
            <option value="White Forest">White Forest</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Lemon">Lemon</option>
          </select>
          <small className="form-text text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple flavors.</small>
          {flavors.length >= 3 && <p className="text-warning">You can only select up to 3 flavors.</p>}
          <p className="mt-3" style={{ color: '#ff1493', fontWeight: 'bold' }}>Don't see your favorite flavor? Enter it below:</p>
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Enter custom flavor"
            value={formData.customFlavor}
            onChange={handleCustomFlavorChange}
            style={{ borderColor: '#ff6347', borderWidth: '2px' }}
          />
        </div>

        {/* Cake Shape Selection */}
          <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Select Cake Shape</label>
          <select className="form-select" name="shape" value={formData.shape} onChange={handleChange}>
            <option value="Round">Round</option>
            <option value="Square">Square</option>
            <option value="Stacked">Stacked</option>
            <option value="HeartShape">Heart Shape</option>
          </select>
        </div>

        {/* Decorations */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Choose CelebrationExtras</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Sprinkles"
                checked={formData.decorations.includes('Sprinkles')}
                onChange={handleDecorationChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>Sprinkles (Ksh300)</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Flowers"
                checked={formData.decorations.includes('Flowers')}
                onChange={handleDecorationChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>Flowers (Ksh400)</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Candles"
                checked={formData.decorations.includes('Candles')}
                onChange={handleDecorationChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>Candles (Ksh250)</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value="Edible Glitter"
                checked={formData.decorations.includes('Edible Glitter')}
                onChange={handleDecorationChange}
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>Edible Glitter (Ksh500)</label>
            </div>
          </div>
        </div>

        {/* Custom Message */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Enter Custom Message</label>
          <input
            type="text"
            className="form-control"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a special message for the cake"
            maxLength="50"
            style={{ borderColor: '#3e2c41' }}
          />
        </div>

        {/* Additional Description */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Additional Description</label>
          <textarea
            className="form-control"
            name="additionalDescription"
            value={formData.additionalDescription}
            onChange={handleChange}
            rows="3"
            placeholder="Provide any additional instructions or details"
            style={{ borderColor: '#3e2c41' }}
          />
        </div>

        {/* Preferred Colors */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Choose Preferred Colors</label>
          <select
            multiple
            className="form-select"
            value={colors}
            onChange={handleColorChange}
            style={{ borderColor: '#3e2c41' }}
          >
            <option value="Red">Red</option>
            <option value="Pink">Pink</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
            <option value="Purple">Purple</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
          </select>
          <small className="form-text text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple colors.</small>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Upload Cake Design Image</label>
          <input type="file" className="form-control" onChange={handleFileUpload} style={{ borderColor: '#3e2c41' }} />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-outline-secondary"
          >
            Reset Customization
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: '#3e2c41', borderColor: '#3e2c41' }}
          >
            Submit Customized Cake
          </button>
        </div>
      </form>
    </div>
  );
}

export default Customize;

