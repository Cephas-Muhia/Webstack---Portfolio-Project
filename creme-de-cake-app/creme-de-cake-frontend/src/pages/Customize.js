import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function Customize() {
  const { orderId } = useParams(); // Get order ID from URL params
  const navigate = useNavigate(); // Initialize navigation hook

  // Form state to handle customization inputs
  const [formData, setFormData] = useState({
    flavor: '',
    customFlavor: '',
    sizeInKgs: 1, // Default to 1 kg
    decorations: [],
    icingType: 'Soft icing',
    shape: 'Round',
    CelebrationExtras: [],
    message: '',
    AdditionalDescription: '',
    preferredColors: [],
    designImage: ''
  });

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload for the cake design image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('designImage', file);

    try {
      const response = await axios.post('http://localhost:5000/api/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({
        ...formData,
        designImage: response.data.filePath, // Save file path to state
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Submit the customization to the backend
  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/customizations`, {
        cakeId: orderId, // Reference to the order or cake ID
        ...formData, // Spread form data to include all fields
      });
      navigate(`/cart/${orderId}`); // Redirect to Cart page with order ID
    } catch (error) {
      console.error('Error submitting customization:', error);
    }
  };

  // Reset the form fields
  const handleReset = () => {
    setFormData({
      flavor: '',
      customFlavor: '',
      sizeInKgs: 1,
      decorations: [],
      icingType: 'Soft icing',
      shape: 'Round',
      CelebrationExtras: [],
      message: '',
      AdditionalDescription: '',
      preferredColors: [],
      designImage: ''
    });
  };

   return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '2rem' }}>Customize Your Cake</h1>
      <p className="text-center lead mb-4" style={{ color: '#3e2c41' }}>Unleash Your Creativity! 🍰✨ Design the cake of your dreams by choosing your icing, size, decorations, colors, and more. Make it uniquely yours—because every celebration deserves a custom touch!</p>


      {/* Flavor selection */}
      <div className="form-group">
        <label>Choose a Flavor</label>
        <input
          type="text"
          name="flavor"
          value={formData.flavor}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your own custom flavor"
        />
      </div>

      {/* Custom flavor input */}
      <div className="form-group">
        <label>Custom Flavor (optional)</label>
        <input
          type="text"
          name="customFlavor"
          value={formData.customFlavor}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your own custom flavor"
        />
      </div>

      {/* Cake size */}
      <div className="form-group">
        <label>Size (in kilograms)</label>
        <input
          type="number"
          name="sizeInKgs"
          value={formData.sizeInKgs}
          onChange={handleChange}
          className="form-control"
          min="1"
        />
      </div>

      {/* Decorations */}
      <div className="form-group">
        <label>Decorations</label>
        <input
          type="text"
          name="decorations"
          value={formData.decorations}
          onChange={handleChange}
          className="form-control"
          placeholder="Add decorations (comma-separated)"
        />
      </div>

      {/* Icing type */}
      <div className="form-group">
        <label>Icing Type</label>
        <select
          name="icingType"
          value={formData.icingType}
          onChange={handleChange}
          className="form-control"
        >
          <option value="Hard icing">Hard icing</option>
          <option value="Soft icing">Soft icing</option>
          <option value="Fresh cream">Fresh cream</option>
        </select>
      </div>

      {/* Cake shape */}
      <div className="form-group">
        <label>Shape</label>
        <select
          name="shape"
          value={formData.shape}
          onChange={handleChange}
          className="form-control"
        >
          <option value="Square">Square</option>
          <option value="Round">Round</option>
          <option value="Stacked">Stacked</option>
          <option value="HeartShape">Heart Shape</option>
        </select>
      </div>

      {/* Celebration extras */}
      <div className="form-group">
        <label>Celebration Extras</label>
        <input
          type="text"
          name="CelebrationExtras"
          value={formData.CelebrationExtras}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter extras (comma-separated)"
        />
      </div>

{/* Preferred colors */}
        <div className="form-group">
         <label>Preferred Colors</label>
         <input
           type="text"
            name="preferredColors"
            value={formData.preferredColors}
           onChange={handleChange}
           className="form-control"
           placeholder="Enter preferred colors (comma-separated)"
         />
       </div>


      {/* Custom message */}
      <div className="form-group">
        <label>What Message Would You Like to See on Your Cake? 📝</label>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter a message for the cake"
        />
      </div>

      {/* Additional description */}
      <div className="form-group">
        <label>Provide additional details on how you envision your cake to be crafted.</label>
        <textarea
          name="AdditionalDescription"
          value={formData.AdditionalDescription}
          onChange={handleChange}
          className="form-control"
          placeholder="Provide any additional customization details"
        ></textarea>
      </div>

      

      {/* Upload design image */}
      <div className="form-group">
        <label>Upload Design Image</label>
        <input type="file" name="designImage" onChange={handleFileUpload} className="form-control-file" />
      </div>

      {/* Buttons for reset and submit */}
      <div className="mt-4">
        <button onClick={handleReset} className="btn btn-secondary mr-3">Reset Customization</button>
        <button onClick={handleSubmit} className="btn btn-primary">Submit Your Customized Cake</button>
      </div>
    </div>
  );
}

export default Customize;

