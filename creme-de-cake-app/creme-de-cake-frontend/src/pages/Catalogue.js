import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Catalogue() {
  const navigate = useNavigate(); // Initialize navigation hook

  const cakes = [
    { name: 'Marble Cake', description: 'A delicious blend of vanilla and chocolate swirled together, creating a beautiful marbled pattern.', imgUrl: '/images/marble-cake.jpg', flavor: 'Marble' },
    { name: 'Vanilla Cake', description: 'A light, fluffy, and moist classic cake, perfect for any occasion.', imgUrl: '/images/vanilla-cake.jpg', flavor: 'Vanilla' },
    { name: 'Orange Cake', description: 'Zesty, citrusy cake made with fresh orange juice and zest for a refreshing flavor.', imgUrl: '/images/orange-cake.jpg', flavor: 'Orange' },
    { name: 'Banana Cake', description: 'A moist and soft cake made with ripe bananas and topped with creamy frosting.', imgUrl: '/images/banana-cake.jpg', flavor: 'Banana' },
    { name: 'Pinacolada Cake', description: 'Tropical cake made with pineapple and coconut, delivering a refreshing taste.', imgUrl: '/images/pinacolada-cake.jpg', flavor: 'Pinacolada' },
    { name: 'Fruit Cake', description: 'A rich, dense cake loaded with dried fruits and nuts, often soaked in brandy or rum.', imgUrl: '/images/fruit-cake.jpg' },
    { name: 'Lemon Cake', description: 'Tangy and refreshing cake infused with lemon juice and zest.', imgUrl: '/images/lemon-cake.jpg' },
    { name: 'Red Velvet', description: 'Velvety smooth red cake with cream cheese frosting.', imgUrl: '/images/red-velvet.jpg' },
    { name: 'Chocolate Cake', description: 'Rich, moist chocolate cake made with cocoa or melted chocolate.', imgUrl: '/images/chocolate-cake.jpg' },
    { name: 'Black Forest Cake', description: 'Layers of chocolate sponge, whipped cream, and cherries, topped with chocolate shavings.', imgUrl: '/images/black-forest-cake.jpg' },
    { name: 'White Forest Cake', description: 'A white chocolate version of the Black Forest, with cream and fruit fillings.', imgUrl: '/images/white-forest-cake.jpg' },
    { name: 'Eggless Cake', description: 'A soft and dense cake made without eggs, suitable for vegetarians or those with egg allergies.', imgUrl: '/images/eggless-cake.jpg' },
    { name: 'Pineapple Cake', description: 'A sweet, moist cake made with fresh pineapple, perfect for tropical dessert lovers.', imgUrl: '/images/pineapple-cake.jpg' },
    { name: 'Blueberry Cake', description: 'A moist cake filled with fresh or frozen blueberries, often paired with a light cream glaze.', imgUrl: '/images/blueberry-cake.jpg' },
    { name: 'Coffee Cake', description: 'A flavorful cake infused with deep coffee flavor, often topped with cinnamon and nuts.', imgUrl: '/images/coffee-cake.jpg' },
    { name: 'Cheesecake', description: 'A rich, creamy dessert made with cream cheese and a graham cracker crust, perfect for indulgence.', imgUrl: '/images/cheesecake.jpg' },
    { name: 'Carrot Cake', description: 'A spiced cake made with grated carrots, walnuts, and topped with cream cheese frosting.', imgUrl: '/images/carrot-cake.jpg' },
    { name: 'Coconut Cake', description: 'A fluffy and moist cake with a coconut flavor, topped with shredded coconut for texture.', imgUrl: '/images/coconut-cake.jpg' },
    { name: 'Fudge Cake', description: 'A dense and rich chocolate cake with a gooey fudge center, ideal for chocolate lovers.', imgUrl: '/images/fudge-cake.jpg' },
    { name: 'Mint Cake', description: 'A refreshing cake flavored with mint, often paired with chocolate for a cool, delicious treat.', imgUrl: '/images/mint-cake.jpg' },
    { name: 'Chocolate Chip Cake', description: 'A soft and fluffy cake loaded with chocolate chips, offering bursts of melted chocolate with every bite.', imgUrl: '/images/chocolate-chip-cake.jpg' },
    { name: 'Royal Velvet Cake', description: 'An elegant variation of the classic red velvet, richer in flavor with sophisticated frosting and decoration.', imgUrl: '/images/royal-velvet-cake.jpg' },
    { name: 'Amarula Cake', description: 'A moist cake flavored with Amarula cream liqueur, perfect for a boozy dessert experience.', imgUrl: '/images/amarula-cake.jpg' },
    { name: 'Strawberry Cake', description: 'A sweet and fruity cake made with fresh strawberries, perfect for summer celebrations.', imgUrl: '/images/strawberry-cake.jpg' },

  ];

  // Function to handle selecting a cake and submitting to the backend
  const handleCustomizeCake = async (cake) => {
    const { name, flavor } = cake;

    // Prepare the payload for submission (no cakeId at this stage)
    const payload = {
      flavor,
      name,
      user: 'user_id', // Assuming this comes from logged-in user
    };

    try {
      const response = await axios.post('http://localhost:5000/api/customization', payload);
      console.log('Customization submitted successfully:', response.data);

      // Navigate to the customize page using the order ID returned by the backend
      const createdOrder = response.data;
      navigate(`/customize/${createdOrder._id}`, { state: { flavor } }); // Passing the flavor via state
    } catch (error) {
      console.error('Error submitting customization:', error.response?.data || error.message);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: '#f5e1a4', // Global background color
        minHeight: '100vh', // Full height for the page
        color: '#3e2c41', // Dark brown color for text
        padding: '20px',
      }}
    >
      <div className="container text-center">
        <h1 className="display-4 font-weight-bold mb-3">Flavor Wonderland 😊</h1>
        <p className="lead mb-4">
          Browse our amazing collection of cake flavors and find your favorite treat!
        </p>
      </div>

      <div className="row mt-4">
        {cakes.map((cake, index) => (
          <div className="col-md-4 mb-4" key={index}> 
            <div className="card shadow" style={{ borderRadius: '10px' }}>
              <img
                src={cake.imgUrl}
                className="card-img-top"
                alt={cake.name}
                style={{ borderRadius: '20px 20px 0 0', height: '400px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-2">{cake.name}</h5>
                <p className="card-text mb-4">{cake.description}</p>
                <button
                  className="btn btn-lg"
                  style={{ backgroundColor: '#3e2c41', color: 'white' }}
                  onClick={() => handleCustomizeCake(cake)} // Pass the cake details to the function
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;

