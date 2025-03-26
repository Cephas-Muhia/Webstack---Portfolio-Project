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

  useEffect(() => {
    if (location.state?.flavor) {
      setCustomization((prev) => ({
        ...prev,
        flavors: [location.state.flavor],
      }));
    }
  }, [location.state]);

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
    if (prev.flavors.includes(flavor)) {
      return { ...prev, flavors: prev.flavors.filter((f) => f !== flavor) };
    }
    if (prev.flavors.length >= 3) {
      alert('You can only select up to 3 flavors.');
      return prev;
    }
    return { ...prev, flavors: [...prev.flavors, flavor] };
  });
};

  const handlePreferredColorsChange = (e) => {
    const { value } = e.target;
    const colorsArray = value.split(',').map((color) => color.trim());
    setCustomization((prev) => ({ ...prev, preferredColors: colorsArray }));
  };

  const handleFileChange = (e) => {
    setCustomization((prev) => ({
      ...prev,
      designImage: e.target.files[0],
    }));
  };

  const createFormData = () => {
  const formData = new FormData();

  // Loop through customization object keys
  Object.keys(customization).forEach((key) => {
    const value = customization[key];

    // Handle file upload for designImage
    if (key === "designImage" && value instanceof File) {
      console.log("Design Image Details:", value.name, value.size, value.type); // Log file details
      formData.append(key, value);
    } 
    // Handle preferredColors as a JSON string
    else if (key === "preferredColors" && Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } 
    // Handle other non-empty arrays
    else if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => formData.append(key, item));
    } 
    // Handle other fields
    else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // Debugging: Log all FormData key-value pairs
  console.log("FormData contents:");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  return formData;
};

const validateForm = () => {
  if (!customization.flavors?.length && !customization.customFlavor) {
    setError("Please select or enter at least one flavor.");
    return false;
  }
  if (!customization.icingType.trim()) {
        setError('Please select an icing type.');
          return false;
  }
  if (!customization.shape.trim()) {
        setError('Please select a cake shape.');
          return false;
  }

  if (
    customization.designImage &&
    customization.designImage.size > 5 * 1024 * 1024
  ) {
    setError("Uploaded image size must be less than 5MB.");
    return false;
  }
  return true;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsSubmitting(true);

  if (!validateForm()) {
    setIsSubmitting(false);
    return;
  }

  const formData = createFormData();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/customizations",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (response.status === 201) {
      alert("Customization saved successfully!");
      navigate("/cart", { state: { customizationId: response.data._id } });
    }
  } catch (err) {
    console.error("Error details:", err.response?.data || err.message);
    setError(
      err.response?.data?.message ||
        "Failed to save customization. Please try again."
    );
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
          <label className="form-label">Choose a Cake Flavor, or a combination of (Up to 3) Cake Flavors.</label>
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
            placeholder="Didn't see your preffered flavor?, Enter your custom flavor."
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
              <option value="">Choose Icing Type ...</option>
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
            <option value="">Choose Cake Shape of your Liking ...</option>
            <option value="Round">Round</option>
            <option value="Square">Square</option>
            <option value="Stacked">Stacked</option>
            <option value="HeartShape">Heart Shape</option>
          </select>
        </div>

        {/* Decoration Extras */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Choose your preferred Celebration Extras.
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
            What are your Preferred Colors?. (Comma-separated)
          </label>
          <input
            type="text"
            className="form-control"
            value={customization.preferredColors.join(', ')}
            onChange={handlePreferredColorsChange}
            placeholder="E.g., red, blue, white"
          />
        </div>

        {/* Custom Message */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>
            Kindly enter a custom Message which you would like to see on your cake.
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
            Upload Cake Design Image of how you envision your cake to look like.
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
           What other Additional Description would you like to be considered during your cake preparation?.
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
