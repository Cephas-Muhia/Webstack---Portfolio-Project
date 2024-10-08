import React, { useState } from 'react';

function Customize() {
  const [icing, setIcing] = useState('');
  const [size, setSize] = useState(1);
  const [flavors, setFlavors] = useState([]);
  const [customFlavor, setCustomFlavor] = useState('');
  const [decorations, setDecorations] = useState([]);
  const [shape, setShape] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleIcingChange = (event) => setIcing(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleFlavorChange = (event) => {
    const value = event.target.value;
    setFlavors((prev) => {
      if (prev.includes(value)) return prev.filter((item) => item !== value);
      if (prev.length < 3) return [...prev, value];
      return prev;
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

  const handleSubmit = () => {
    alert(`Cake Customized! Icing: ${icing}, Size: ${size}kg, Flavors: ${flavors.join(', ') || customFlavor}, Shape: ${shape}, Decorations: ${decorations.join(', ')}, Message: ${message}, Description: ${description}`);
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '2rem' }}>Customize Your Cake</h1>
      <p className="text-center lead mb-4" style={{ color: '#3e2c41' }}>Unleash Your Creativity! 🍰✨ Design the cake of your dreams by choosing your icing, size, decorations, and more. Make it uniquely yours—because every celebration deserves a custom touch!</p>

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
        <label className="form-label" style={{ color: '#3e2c41' }}>Select Up to 3 Cake Flavors</label>
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

      {/* Shape Selection */}
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
        <label className="form-label" style={{ color: '#3e2c41' }}>Choose Decorations</label>
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
            <label className="form-check-label" style={{ color: '#3e2c41' }}>Flowers</label>
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

      {/* Message on Cake */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>What Message Would You Like to See on Your Cake? 📝</label>
        <input
          type="text"
          className="form-control"
          placeholder="Happy Birthday, Congratulations,I love you Sweeriee etc."
          value={message}
          onChange={handleMessageChange}
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Have a Cake Design in Mind? Upload It Here! 📷</label>
        <input type="file" className="form-control" onChange={handleImageUpload} />
      </div>

      {/* Cake Description */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Describe How You Want the Cake Done</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Describe your dream cake..."
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="btn btn-dark" style={{ backgroundColor: '#3e2c41', color: 'white' }}>
          Submit Customization
        </button>
      </div>
    </div>
  );
}

export default Customize;

