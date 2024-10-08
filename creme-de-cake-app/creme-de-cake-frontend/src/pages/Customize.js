import React, { useState } from 'react';

function Customize() {
  const [icing, setIcing] = useState('');
  const [size, setSize] = useState(1);
  const [decorations, setDecorations] = useState([]);

  const handleIcingChange = (event) => setIcing(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  const handleDecorationChange = (event) => {
    const value = event.target.value;
    setDecorations((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    alert(`Cake Customized! Icing: ${icing}, Size: ${size}kg, Decorations: ${decorations.join(', ')}`);
  };

  return (
    <div className="container" style={{ backgroundColor: '#e4ab63', minHeight: '100vh' }}>
      <h1 className="text-center text-white mt-5">Customize Your Cake</h1>
      <p className="text-center text-white lead mb-4">Choose your icing, size, and decorations.</p>

      {/* Icing Selection */}
      <div className="mb-4">
        <label className="form-label text-white">Select Icing</label>
        <select className="form-select" value={icing} onChange={handleIcingChange}>
          <option value="">Choose icing...</option>
          <option value="Hard Icing">Hard Icing</option>
          <option value="Soft Icing">Soft Icing</option>
          <option value="Fresh Cream">Fresh Cream</option>
        </select>
      </div>

      {/* Cake Size Selection */}
      <div className="mb-4">
        <label className="form-label text-white">Select Cake Size (kg)</label>
        <input
          type="range"
          className="form-range"
          min="1"
          max="15"
          value={size}
          onChange={handleSizeChange}
          step="0.5"
        />
        <p className="text-center text-white">{size} kg</p>
      </div>

      {/* Decorations Selection */}
      <div className="mb-4">
        <label className="form-label text-white">Choose Decorations</label>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="form-check">
            <input
              type="checkbox"
              value="Sprinkles"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label text-white">Sprinkles</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Flowers"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label text-white">Flowers</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Candles"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label text-white">Candles</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Edible Glitter"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label text-white">Edible Glitter</label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              value="Chocolate Shavings"
              onChange={handleDecorationChange}
              className="form-check-input"
            />
            <label className="form-check-label text-white">Chocolate Shavings</label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <button onClick={handleSubmit} className="btn btn-dark" style={{ backgroundColor: '#5a3f2d' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Customize;


