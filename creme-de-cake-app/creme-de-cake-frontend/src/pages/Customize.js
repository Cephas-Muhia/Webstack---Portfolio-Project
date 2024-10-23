import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Customize() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cakeId: '',
    name: '',
    CakeFlavor: '',
    customFlavor: '',
    sizeInKgs: 1,
    decorations: [],
    icingType: 'Soft icing',
    shape: 'Round',
    celebrationExtras: [],
    message: '',
    additionalDescription: '',
    preferredColors: [],
    designImage: '',
  });

  const [flavors, setFlavors] = useState([]);
  const [colors, setColors] = useState([]);
  const [cakeData, setCakeData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch cake data by orderId from API
  useEffect(() => {
    const fetchCakeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cakes/${orderId}`);
        const cake = response.data;

        setFormData(prevData => ({
          ...prevData,
          cakeId: cake._id,
          name: cake.name || '',
          CakeFlavor: cake.flavor || '',
          sizeInKgs: cake.sizeInKgs || 1,
          decorations: cake.decorations || [],
          icingType: cake.icingType || 'Soft icing',
          shape: cake.shape || 'Round',
          celebrationExtras: cake.celebrationExtras || [],
          message: cake.message || '',
          additionalDescription: cake.additionalDescription || '',
          preferredColors: cake.preferredColors || [],
          designImage: cake.designImage || '',
        }));
        setCakeData(cake);
      } catch (error) {
        setError('Error fetching cake data. Please try again later.');
        console.error('Error fetching cake data:', error);
      }
    };

    if (orderId) {
      fetchCakeData();
    }
  }, [orderId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFlavorChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    if (options.length <= 3) {
      setFlavors(options);
      setFormData(prevData => ({ ...prevData, CakeFlavor: options }));
    }
  };

  const handleCustomFlavorChange = (e) => {
    setFormData(prevData => ({ ...prevData, customFlavor: e.target.value }));
  };

  const handleColorChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setColors(options);
    setFormData(prevData => ({ ...prevData, preferredColors: options }));
  };

  const handleDecorationChange = (e) => {
    const { value, checked } = e.target;
    const updatedDecorations = checked
      ? [...formData.decorations, value]
      : formData.decorations.filter(decoration => decoration !== value);
    setFormData(prevData => ({ ...prevData, decorations: updatedDecorations }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('designImage', file);

    try {
      const response = await axios.post('http://localhost:5000/api/uploads', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData(prevData => ({ ...prevData, designImage: response.data.filePath }));
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('File upload failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customizationData = {
      name: formData.name,
      flavor: formData.CakeFlavor.length > 0 ? formData.CakeFlavor : formData.customFlavor,
      sizeInKgs: formData.sizeInKgs,
      shape: formData.shape,
      icingType: formData.icingType,
      decorations: formData.decorations,
      message: formData.message,
      additionalDescription: formData.additionalDescription,
      preferredColors: formData.preferredColors.join(', '),
      designImage: formData.designImage,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/customizations', customizationData);
      const newOrderId = response.data.order._id;
      navigate(`/cart/${newOrderId}`);
    } catch (error) {
      console.error('Error creating customization:', error);
      setError('Failed to submit customization. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      cakeId: '',
      name: '',
      CakeFlavor: '',
      customFlavor: '',
      sizeInKgs: 1,
      decorations: [],
      icingType: 'Soft icing',
      shape: 'Round',
      celebrationExtras: [],
      message: '',
      additionalDescription: '',
      preferredColors: [],
      designImage: '',
    });
    setFlavors([]);
    setColors([]);
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh', padding: '20px', borderRadius: '8px' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '2rem' }}>Customize Your Cake</h1>
      <p className="text-center lead mb-4" style={{ color: '#3e2c41' }}>
        Unleash Your Creativity! 🍰✨ Design the cake of your dreams by choosing your icing, size, decorations, colors, and more. Make it uniquely yours—because every celebration deserves a custom touch!
      </p>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Icing Type */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Select Icing</label>
          <select className="form-select" name="icingType" value={formData.icingType} onChange={handleChange}>
            <option value="Soft icing">Soft icing</option>
            <option value="Hard icing">Hard icing</option>
            <option value="Fresh cream">Fresh cream</option>
          </select>
        </div>

        {/* Cake Size */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Select Cake Size (kg)</label>
          <input
            type="range"
            className="form-range"
            name="sizeInKgs"
            min="0.5"
            max="15"
            step="0.5"
            value={formData.sizeInKgs}
            onChange={handleChange}
          />
          <p className="text-center" style={{ color: '#3e2c41' }}>{formData.sizeInKgs} kg</p>
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
          <label className="form-label" style={{ color: '#3e2c41' }}>Select Celebration extra.</label>
          <div>
            {['Sprinkles', 'Candles', 'Flowers', 'Edible Glitter'].map((decoration) => (
              <div className="form-check" key={decoration}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={decoration}
                  checked={formData.decorations.includes(decoration)}
                  onChange={handleDecorationChange}
                />
                <label className="form-check-label" style={{ color: '#3e2c41' }}>{decoration}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>What Message would you like to see on your cake</label>
          <input
            type="text"
            className="form-control"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write a message for the cake"
          />
        </div>

        {/* Additional Description */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Add additional description of how you want your cake to be done.</label>
          <textarea
            className="form-control"
            name="additionalDescription"
            value={formData.additionalDescription}
            onChange={handleChange}
            rows="3"
            placeholder="Any extra details for customization?"
          />
        </div>

        {/* Preferred Colors */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Select Preferred Colors</label>
          <select multiple className="form-select" value={colors} onChange={handleColorChange}>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Purple">Purple</option>
            <option value="Pink">Pink</option>
            <option value="Orange">Orange</option>
          </select>
          <small className="form-text text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple colors.</small>
        </div>

        {/* Design Image Upload */}
        <div className="mb-4">
          <label className="form-label" style={{ color: '#3e2c41' }}>Upload Design Image of how you envision your cake to look like.</label>
          <input type="file" className="form-control" accept="image/*" onChange={handleFileUpload} />
          {formData.designImage && <p className="text-success">Image uploaded successfully!</p>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary me-2">Submit Customized Cake</button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset Customization</button>
        </div>
      </form>
    </div>
  );
}

export default Customize;

