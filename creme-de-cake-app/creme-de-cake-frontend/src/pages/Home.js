import React from 'react'; 
import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center" 
      style={{ 
        backgroundColor: '#f5e1a4',  // Example color from the image (light yellowish cream)
        minHeight: '100vh',  // Change from 100vh to min-height for better responsiveness
        color: '#3e2c41',  // Example dark brown color from the image
        padding: '20px' 
      }}
    >
      <div className="container text-center">
        {/* Title and description */}
        <h1 className="display-4 font-weight-bold mb-3">
          Welcome to Cre`me de Cake! 🍰
        </h1>
        <p className="lead mb-4">
          Your one-stop destination for indulging in delightful, mouth-watering cakes, crafted with love and perfection.
          Whether you're celebrating a special occasion or simply satisfying your sweet cravings, we’ve got the perfect cake for you!
        </p>
        <p className="lead mb-4">
          Choose from a wide range of flavors, sizes, and customize your cake with the finest icings to make every bite unforgettable. 
          At Cre`me de Cake, every slice is a moment of happiness. Let us add a little sweetness to your day! 🧁🎂
        </p>

        {/* Button to explore cakes */}
        <div className="mt-5">
          <Link 
            to="/catalogue" 
            className="btn btn-lg btn-dark" 
            style={{ backgroundColor: '#3e2c41' }} // Dark brown button
          >
            Explore Our Cakes
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <img
              src="/images/image1.jpg"  // Correct path to your local image
              alt="Delicious Cakes"
              className="img-fluid rounded shadow-lg"
              style={{
                width: '100%', // Ensure the image takes full width of its parent container
                height: 'auto',
                objectFit: 'cover',  // Ensures the image fits within its container without distortion
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

