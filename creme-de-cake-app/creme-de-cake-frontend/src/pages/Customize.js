import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Customize() {
  const location = useLocation();
  const navigate = useNavigate();

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

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableFlavors = [
    'Marble', 'Vanilla', 'Orange', 'Banana', 'Pinacolada', 'Fruit',
    'Lemon', 'Red Velvet', 'Chocolate', 'Black Forest', 'White Forest',
    'Eggless', 'Pineapple', 'Blueberry', 'Coffee', 'Cheesecake',
    'Carrot', 'Coconut', 'Fudge', 'Mint', 'Chocolate Chip',
    'Royal Velvet', 'Amarula', 'Strawberry',
  ];

  // Populate initial flavors if passed via location state
  useEffect(() => {
    if (location.state?.flavor) {
      setCustomization((prev) => ({
        ...prev,
        flavors: [location.state.flavor],
      }));
    }
  }, [location.state]);

  // Utility Functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomization((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCustomization((prev) => ({
      ...prev,
      decorations: checked
        ? [...prev.decorations, value]
        : prev.decorations.filter((item) => item !== value),
    }));
  };

  const handleFlavorChange = (flavor) => {
    setCustomization((prev) => {
      const updatedFlavors = prev.flavors.includes(flavor)
        ? prev.flavors.filter((f) => f !== flavor)
        : [...prev.flavors, flavor];
      return updatedFlavors.length <= 3
        ? { ...prev, flavors: updatedFlavors }
        : { ...prev };
    });
  };

  const handleFileChange = (e) => {
    setCustomization((prev) => ({
      ...prev,
      designImage: e.target.files[0],
    }));
  };

  const createFormData = () => {
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
    return formData;
  };

  const validateForm = () => {
    if (!customization.flavors.length && !customization.customFlavor) {
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
    if (customization.designImage && customization.designImage.size > 5 * 1024 * 1024) {
      setError('Uploaded image size must be less than 5MB.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = createFormData();
      const response = await axios.post(
        'http://localhost:5000/api/customizations',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 201) {
        alert('Customization saved successfully!');
        navigate('/cart', { state: { customizationId: response.data._id } });
      }
    } catch (err) {
      console.error('Error saving customization:', err);
      setError('Failed to save customization. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      className="container mt-5 p-4 shadow"
      style={{ backgroundColor: '#f5e1a4', borderRadius: '8px', minHeight: '100vh' }}
    >
      <h1 className="text-center" style={{ color: '#3e2c41', fontWeight: 'bold' }}>
        Customize Your Cake
      </h1>
      <p className="text-center lead mb-4" style={{ color: '#3e2c41' }}>
        Unleash Your Creativity! 🍰✨ Design the cake of your dreams.
      </p>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {isSubmitting && <div className="text-center text-warning">Submitting...</div>}

      <form onSubmit={handleSubmit}>
       {/* Flavor Selection */}
        <div className="mb-3">
          <label className="form-label">Choose Cake Flavors (Up to 3)</label>
          <div>
            {availableFlavors.map((flavor, index) => (
              <div key={index} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={flavor}
                  checked={customization.flavors.includes(flavor)}
                  onChange={() => handleFlavorChange(flavor)}
                />
                <label className="form-check-label">{flavor}</label>
              </div>
            ))}
          </div>
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

