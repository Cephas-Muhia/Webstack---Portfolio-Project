import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Customize() {
  const location = useLocation();
  const item = location.state?.item || {}; // Get item from Cart, or set as an empty object
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
    alert(`Cake Customized! Icing: ${icing}, Size: ${size}kg, Flavors: ${flavors.join(', ') || customFlavor}, Shape: ${shape}, Decorations: ${decorations.join(', ')}, Colors: ${colors.join(', ')}, Message: ${message}, Description: ${description}`);
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '2rem' }}>Customize Your Cake</h1>
      <p className="text-center lead mb-4" style={{ color: '#3e2c41' }}>Unleash Your Creativity! 🍰✨ Design the cake of your dreams by choosing your icing, size, decorations, colors, and more. Make it uniquely yours—because every celebration deserves a custom touch!</p>

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
            <label className="form-check-label" style={{ color: '#3e2c41' }}>Sprinkles</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Flowers"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label" style={{ color: '#3e2c41' }}>Floral Touch</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Candles"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label" style={{ color: '#3e2c41' }}>Candles</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Edible Glitter"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label" style={{ color: '#3e2c41' }}>Edible Glitter</label>
          </div>
        </div>
      </div>

      {/* Cake Color Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select your preferred Cake Color/Colors</label>
        <select multiple className="form-select" value={colors} onChange={handleColorChange}>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
          <option value="Pink">Pink</option>
          <option value="Purple">Purple</option>
          <option value="Orange">Orange</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>
        <small className="form-text text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple colors.</small>
      </div>

      {/* Message on Cake */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>What Message Would You Like to See on Your Cake? 📝</label>
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your cake message here..."
        />
      </div>

      {/* Upload Cake Image */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Have a Cake Design in Mind? Upload It Here! 📷</label>
        <input type="file" className="form-control" onChange={handleImageUpload} />
      </div>

      {/* Additional Instructions */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Provide additional details on how you envision your cake to be crafted.</label>
        <textarea
          className="form-control"
          rows="4"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe your dream cake!"
        />
      </div>

      {/* Submit Button */}
      <button className="btn btn-primary w-100" onClick={handleSubmit} style={{ backgroundColor: '#3e2c41', borderColor: '#3e2c41' }}>Submit Custom Cake</button>
    </div>
  );
}

export default Customize;

