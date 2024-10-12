import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Customize() {
  const location = useLocation();
  const item = location.state?.item || {}; // Get item from Cart, or set as an empty object
  const navigate = useNavigate(); // Add useNavigate for navigation
  const { id } = useParams(); // Capture the cake ID from the URL

  // State variables either populated with the passed item's details or default values
  const [icing, setIcing] = useState('');
  const [size, setSize] = useState(1);
  const [flavors, setFlavors] = useState([]);
  const [customFlavor, setCustomFlavor] = useState('');
  const [decorations, setDecorations] = useState([]);
  const [shape, setShape] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [colors, setColors] = useState([]);

  const [hasChanges, setHasChanges] = useState(false);

  // Update hasChanges when any state changes
  useEffect(() => {
    setHasChanges(
      icing || size !== 1 || flavors.length > 0 || customFlavor || decorations.length > 0 ||
      shape || message || image || description || colors.length > 0
    );
  }, [icing, size, flavors, customFlavor, decorations, shape, message, image, description, colors]);

  // Reset functionality
  const handleReset = () => {
    setIcing('');
    setSize(1);
    setFlavors([]);
    setCustomFlavor('');
    setDecorations([]);
    setShape('');
    setMessage('');
    setImage(null);
    setDescription('');
    setColors([]);
    setHasChanges(false);
  };

  // Event handler functions
  const handleIcingChange = (event) => setIcing(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);

  const handleFlavorChange = (event) => {
    const value = event.target.value;
    setFlavors((prev) => {
      if (prev.includes(value)) return prev.filter((item) => item !== value); // Remove if selected again
      if (prev.length < 3) return [...prev, value]; // Add new flavor if less than 3 selected
      return prev; // Do nothing if more than 3 flavors
    });
  };

  const handleCustomFlavorChange = (event) => setCustomFlavor(event.target.value);

  const handleDecorationChange = (event) => {
    const value = event.target.value;
    setDecorations((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleShapeChange = (event) => setShape(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageUpload = (event) => setImage(event.target.files[0]);
  const handleColorChange = (event) => {
    const value = event.target.value;
    setColors((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (!hasChanges) return; // Prevent submission if no changes were made

    // Collect all cake customization details
    const customCake = {
      icing,
      size,
      flavors: flavors.length > 0 ? flavors : [customFlavor], // Use custom flavor if no flavors selected
      decorations,
      shape,
      message,
      image,
      description,
      colors,
    };

    // Display an alert with the customization summary
    alert(`
      Cake Customized!
      Icing: ${icing}
      Size: ${size}kg
      Flavors: ${customCake.flavors.join(', ')}
      Shape: ${shape}
      Decorations: ${decorations.join(', ')}
      Colors: ${colors.join(', ')}
      Message: ${message}
      Description: ${description}
    `);

    // Navigate to Cart page and pass the customized cake as state
    navigate('/cart', { state: { customCake } });
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '2rem' }}>Customize Your Cake</h1>
      <p className="text-center lead mb-4" style={{ color: '#3e2c41' }}>
        Unleash Your Creativity! 🍰✨ Design the cake of your dreams by choosing your icing, size, 
        decorations, colors, and more. Make it uniquely yours—because every celebration deserves 
        a custom touch!
      </p>

      {/* Icing Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select Icing</label>
        <select className="form-select" value={icing} onChange={handleIcingChange}>
          <option value="">Choose icing...</option>
          <option value="Hard Icing">Hard Icing</option>
          <option value="Soft Icing">Soft Icing</option>
          <option value="Fresh Cream">Fresh Cream</option>
        </select>
      </div>

      {/* Cake Size Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select Cake Size (kg)</label>
        <input
          type="range"
          className="form-range"
          min="0.5"
          max="15"
          value={size}
          onChange={handleSizeChange}
          step="0.5"
        />
        <p className="text-center" style={{ color: '#3e2c41' }}>{size} kg</p>
      </div>

      {/* Cake Flavor Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select one or combine Up to 3 Cake Flavors</label>
        <select multiple className="form-select" value={flavors} onChange={handleFlavorChange}>
          <option value="Vanilla">Vanilla</option>
          <option value="Strawberry">Strawberry</option>
          <option value="Marble">Marble</option>
          <option value="Red Velvet">Red Velvet</option>
          <option value="Royal Velvet">Royal Velvet</option>
          <option value="Black Forest">Black Forest</option>
          <option value="White Forest">White Forest</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Bubble Gum">Bubble Gum</option>
          <option value="Lemon">Lemon</option>
        </select>
        <small className="form-text text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple flavors.</small>
        {flavors.length >= 3 && (
          <p className="text-warning" style={{ color: 'red' }}>You can only select up to 3 flavors.</p>
        )}
        <p className="mt-3" style={{ color: '#ff1493', fontWeight: 'bold' }}>Don't see your favorite flavor? Enter it below:</p>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter custom flavor"
          value={customFlavor}
          onChange={handleCustomFlavorChange}
          style={{ borderColor: '#ff6347', color: '#ff6347' }}
        />
      </div>

      {/* Cake Shape Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select Cake Shape</label>
        <select className="form-select" value={shape} onChange={handleShapeChange}>
          <option value="">Choose shape...</option>
          <option value="Round">Round</option>
          <option value="Square">Square</option>
          <option value="Heart">Heart</option>
          <option value="Custom">Custom Shape</option>
        </select>
      </div>

      {/* Decoration Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Celebration Extras</label>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="form-check">
            <input
              type="checkbox"
              value="Sprinkles"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label" style={{ color: '#ff1493' }}>Sprinkles</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Edible Glitter"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label" style={{ color: '#ff1493' }}>Edible Glitter</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Candles"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label" style={{ color: '#ff1493' }}>Candles</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Personalized Cake Topper"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label" style={{ color: '#ff1493' }}>Personalized Cake Topper</label>
          </div>
        </div>
      </div>

      {/* Cake Colors Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Pick Your desired Cake Color Theme</label>
        <select multiple className="form-select" value={colors} onChange={handleColorChange}>
          <option value="Pink">Pink</option>
          <option value="White">White</option>
          <option value="Gold">Gold</option>
          <option value="Blue">Blue</option>
          <option value="Purple">Purple</option>
          <option value="Yellow">Yellow</option>
        </select>
      </div>

      {/* Cake Message */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>What Message Would You Like to See on Your Cake? 📝</label>
        <input
          type="text"
          className="form-control"
          placeholder="E.g., Happy Birthday!, Happy Valentines"
          value={message}
          onChange={handleMessageChange}
        />
      </div>

      {/* Cake Image Upload */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Have a Cake Design in Mind? Upload It Here! 📷</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Provide additional details on how you envision your cake to be crafted.</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Describe how you'd like the cake to be done..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      {/* Submit and Reset Buttons */}
      <div className="text-center">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          style={{ marginLeft: '1rem', backgroundColor: '#3e2c41', borderColor: '#3e2c41' }}
          disabled={!hasChanges}
        >
          Submit Cake Customization
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleReset}
          style={{ backgroundColor: '#ffcccb', borderColor: '#3e2c41'}}
        >
          Reset All Fields
        </button>
      </div>
    </div>
  );
}

export default Customize;

