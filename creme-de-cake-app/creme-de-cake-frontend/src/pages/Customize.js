import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function Customize() {
  const { orderId } = useParams(); // Get order ID from URL params
  const navigate = useNavigate(); // Initialize navigation hook

  // Form state to handle customization inputs
  const [formData, setFormData] = useState({
    cakeId: '', // Add this field for cake ID
    name: '',
    CakeFlavor: '', // Updated to a string since it's required as a single flavor
    customFlavor: '',
    sizeInKgs: 1, // Default to 1 kg
    decorations: [], // Assuming this will be an array of strings
    icingType: 'Soft icing',
    shape: 'Round',
    celebrationExtras: [], // Assuming this will be an array of strings
    message: '',
    additionalDescription: '',
    preferredColors: '', // Updated to a string as per the schema requirement
    designImage: ''
  });

  const [flavors, setFlavors] = useState([]); // To handle multiple flavors
  const [colors, setColors] = useState([]); // To handle multiple colors
  const [cakeData, setCakeData] = useState(null); // To store fetched cake data

    // Fetch cake data when component mounts or orderId changes
  useEffect(() => {
    const fetchCakeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cakes/${orderId}`);
        const cake = response.data;

        // Populate form data with fetched cake data
        setFormData({
          cakeId: cake._id, // Set cakeId from fetched data
          name: cake.name || '', // Ensure name is filled
          CakeFlavor: cake.flavor || '', // Assuming a single flavor is stored
          customFlavor: '', // Reset custom flavor
          sizeInKgs: cake.sizeInKgs || 1,
          decorations: cake.decorations || [], // Set decorations
          icingType: cake.icingType || 'Soft icing',
          shape: cake.shape || 'Round',
          celebrationExtras: cake.celebrationExtras || [],
          message: cake.message || '',
          additionalDescription: cake.additionalDescription || '',
          preferredColors: cake.preferredColors || '', // Adjusted to a string
          designImage: cake.designImage || ''
        });

        setCakeData(cake); // Store cake data
      } catch (error) {
        console.error('Error fetching cake data:', error);
      }
    };

    if (orderId) {
      fetchCakeData();
    }
  }, [orderId]);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle flavor selection with a limit of 3
  const handleFlavorChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    if (options.length <= 3) {
      setFlavors(options);
      setFormData({ ...formData, flavors: options });
    }
  };

  // Handle custom flavor input
  const handleCustomFlavorChange = (e) => {
    setFormData({ ...formData, customFlavor: e.target.value });
  };

  // Handle cake color selection
  const handleColorChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setColors(options);
    setFormData({ ...formData, preferredColors: options.join(', ') }); // Join array to string for preferredColors
  };

  // Handle decoration selection
  const handleDecorationChange = (e) => {
    const { value, checked } = e.target;
    const updatedDecorations = checked
      ? [...formData.decorations, value]
      : formData.decorations.filter((decoration) => decoration !== value);
    setFormData({ ...formData, decorations: updatedDecorations });
  };

  // Handle file upload for the cake design image
  const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('designImage', file);

  try {
    const response = await axios.post('http://localhost:5000/api/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('File uploaded successfully', response.data);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};


   // Submit the customization to the backend
     const handleSubmit = async (e) => {
  e.preventDefault();

  const customizationData = {
  name: order?.name || '',  // Use optional chaining to avoid errors if order is undefined
  flavor: selectedFlavor,  // Selected flavor or custom flavor
  customFlavor: customFlavor || '',  // User's custom flavor (optional)
  sizeInKgs: cakeSize,  // Size of the cake in kg
  shape: selectedShape,  // Cake shape (Square, Round, etc.)
  icingType: selectedIcing,  // Selected icing type (e.g. 'Hard icing', 'Soft icing', 'Fresh cream')
  decorations: selectedDecorations,  // Selected decorations or extras
  message: customMessage || '',  // Custom cake message
  additionalDescription: additionalDescription || '',  // Additional customization description (optional)
  preferredColors: selectedColors,  // Colors selected for the cake decoration
  designImage: uploadedImage || '',  // Reference to the uploaded image for the cake design
};

try {
  const response = await axios.post('http://localhost:5000/api/customizations', customizationData);
  console.log("Order created successfully:", response.data.order);

  // Assuming response.data.order contains the order ID
  const orderId = response.data.order._id; // Adjust this based on your API response

  // Redirect to Cart page with order ID
  navigate(`/cart/${orderId}`);
} catch (error) {
  console.error("Error in order creation:", error);
}


  // Reset the form fields
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
      preferredColors: '',
      designImage: ''
    });
    setFlavors([]);
    setColors([]);
  };

  return (
    <div className="container" style={{ backgroundColor: '#f5e1a4', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ color: '#3e2c41', marginTop: '2rem' }}>Customize Your Cake</h1>
      <p className="text-center lead mb-4" style={{ color: '#3e2c41' }}>
        Unleash Your Creativity! 🍰✨ Design the cake of your dreams by choosing your icing, size, decorations, colors, and more. Make it uniquely yours—because every celebration deserves a custom touch!
      </p>

      {/* Icing Type */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select Icing</label>
        <select
          className="form-select"
          name="icingType"
          value={formData.icingType}
          onChange={handleChange}
        >
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
        {flavors.length >= 3 && (
          <p className="text-warning">You can only select up to 3 flavors.</p>
        )}
        <p className="mt-3" style={{ color: '#ff1493', fontWeight: 'bold' }}>Don't see your favorite flavor? Enter it below:</p>
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Enter custom flavor"
          value={formData.customFlavor}
          onChange={handleCustomFlavorChange}
          style={{ borderColor: '#ff6347', color: '#ff6347' }}
        />
      </div>

      {/* Cake Shape */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select Cake Shape</label>
        <select
          className="form-select"
          name="shape"
          value={formData.shape}
          onChange={handleChange}
        >
          <option value="Round">Round</option>
          <option value="Square">Square</option>
          <option value="Heart">Heart</option>
          <option value="Stacked">Stacked</option>
        </select>
      </div>

      {/* Decoration Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Choose Celebration Extra's</label>
        <div className="d-flex flex-wrap justify-content-between">
          {['Sprinkles', 'Flowers', 'Candles', 'Edible Glitter'].map((decoration) => (
            <div className="form-check" key={decoration}>
              <input
                type="checkbox"
                value={decoration}
                onChange={handleDecorationChange}
                className="form-check-input"
              />
              <label className="form-check-label" style={{ color: '#3e2c41' }}>{decoration}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Cake Color Selection */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Select Your Preferred Cake Colors</label>
        <select multiple className="form-select" value={colors} onChange={handleColorChange}>
          {['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Black', 'White'].map((color) => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
        <small className="form-text text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple colors.</small>
      </div>

      {/* Custom Cake Message */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>What Message Would You Like to See on Your Cake? 📝</label>
        <input
          type="text"
          className="form-control"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="E.g., 'Happy Birthday!', 'I love you Sweeriee', 'Congratulation'"
        />
      </div>

      {/* Additional Description */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Provide additional details on how you envision your cake to be crafted.</label>
        <textarea
          className="form-control"
          name="AdditionalDescription"
          value={formData.AdditionalDescription}
          onChange={handleChange}
          placeholder="Provide extra details for your cake..."
        />
      </div>

      {/* File Upload for Cake Design */}
      <div className="mb-4">
        <label className="form-label" style={{ color: '#3e2c41' }}>Upload a Picture of how you envision your cake to look like</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleFileUpload}
          placeholder="upload an image of your cake design here!"
        />
      </div>

      <div className="d-flex justify-content-between mt-5">
        <button className="btn btn-secondary" onClick={handleReset}>Reset Customization</button>
        <button className="btn btn-success" onClick={handleSubmit}>Submit Customized Cake</button>
      </div>
    </div>
  );
}

export default Customize;
