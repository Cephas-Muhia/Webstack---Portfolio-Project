import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import Axios

function Catalogue() {
  const navigate = useNavigate(); // Initialize navigation hook

  const cakes = [
    { id: 1, name: 'Marble Cake', description: 'A delicious blend of vanilla and chocolate swirled together, creating a beautiful marbled pattern.', imgUrl: '/images/marble-cake.jpg' },
    { id: 2, name: 'Vanilla Cake', description: 'A light, fluffy, and moist classic cake, perfect for any occasion.', imgUrl: '/images/vanilla-cake.jpg' },
    { id: 3, name: 'Orange Cake', description: 'Zesty, citrusy cake made with fresh orange juice and zest for a refreshing flavor.', imgUrl: '/images/orange-cake.jpg' },
    { id: 4, name: 'Banana Cake', description: 'A moist and soft cake made with ripe bananas and topped with creamy frosting.', imgUrl: '/images/banana-cake.jpg' },
    { id: 5, name: 'Pinacolada Cake', description: 'Tropical cake made with pineapple and coconut, delivering a refreshing taste.', imgUrl: '/images/pinacolada-cake.jpg' },
    { id: 6, name: 'Fruit Cake', description: 'A rich, dense cake loaded with dried fruits and nuts, often soaked in brandy or rum.', imgUrl: '/images/fruit-cake.jpg' },
    { id: 7, name: 'Lemon Cake', description: 'Tangy and refreshing cake infused with lemon juice and zest.', imgUrl: '/images/lemon-cake.jpg' },
    { id: 8, name: 'Red Velvet', description: 'Velvety smooth red cake with cream cheese frosting.', imgUrl: '/images/red-velvet.jpg' },
    { id: 9, name: 'Chocolate Cake', description: 'Rich, moist chocolate cake made with cocoa or melted chocolate.', imgUrl: '/images/chocolate-cake.jpg' },
    { id: 10, name: 'Black Forest Cake', description: 'Layers of chocolate sponge, whipped cream, and cherries, topped with chocolate shavings.', imgUrl: '/images/black-forest-cake.jpg' },
    { id: 11, name: 'White Forest Cake', description: 'A white chocolate version of the Black Forest, with cream and fruit fillings.', imgUrl: '/images/white-forest-cake.jpg' },
    { id: 12, name: 'Eggless Cake', description: 'A soft and dense cake made without eggs, suitable for vegetarians or those with egg allergies.', imgUrl: '/images/eggless-cake.jpg' },
    { id: 13, name: 'Pineapple Cake', description: 'A sweet, moist cake made with fresh pineapple, perfect for tropical dessert lovers.', imgUrl: '/images/pineapple-cake.jpg' },
    { id: 14, name: 'Blueberry Cake', description: 'A moist cake filled with fresh or frozen blueberries, often paired with a light cream glaze.', imgUrl: '/images/blueberry-cake.jpg' },
    { id: 15, name: 'Coffee Cake', description: 'A flavorful cake infused with deep coffee flavor, often topped with cinnamon and nuts.', imgUrl: '/images/coffee-cake.jpg' },
    { id: 16, name: 'Cheesecake', description: 'A rich, creamy dessert made with cream cheese and a graham cracker crust, perfect for indulgence.', imgUrl: '/images/cheesecake.jpg' },
    { id: 17, name: 'Carrot Cake', description: 'A spiced cake made with grated carrots, walnuts, and topped with cream cheese frosting.', imgUrl: '/images/carrot-cake.jpg' },
    { id: 18, name: 'Coconut Cake', description: 'A fluffy and moist cake with a coconut flavor, topped with shredded coconut for texture.', imgUrl: '/images/coconut-cake.jpg' },
    { id: 19, name: 'Fudge Cake', description: 'A dense and rich chocolate cake with a gooey fudge center, ideal for chocolate lovers.', imgUrl: '/images/fudge-cake.jpg' },
    { id: 20, name: 'Mint Cake', description: 'A refreshing cake flavored with mint, often paired with chocolate for a cool, delicious treat.', imgUrl: '/images/mint-cake.jpg' },
    { id: 21, name: 'Chocolate Chip Cake', description: 'A soft and fluffy cake loaded with chocolate chips, offering bursts of melted chocolate with every bite.', imgUrl: '/images/chocolate-chip-cake.jpg' },
    { id: 22, name: 'Royal Velvet Cake', description: 'An elegant variation of the classic red velvet, richer in flavor with sophisticated frosting and decoration.', imgUrl: '/images/royal-velvet-cake.jpg' },
    { id: 23, name: 'Amarula Cake', description: 'A moist cake flavored with Amarula cream liqueur, perfect for a boozy dessert experience.', imgUrl: '/images/amarula-cake.jpg' },
    { id: 24, name: 'Strawberry Cake', description: 'A sweet and fruity cake made with fresh strawberries, perfect for summer celebrations.', imgUrl: '/images/strawberry-cake.jpg' },
  ];

  const handleCustomizeClick = async (cakeId, flavor) => {
    try {
      // Create a new order in the backend using Axios
      const response = await axios.post('http://localhost:5000/api/orders', {
        flavor, // Send the flavor to the backend
        user: 'user_id', // Replace this with the actual user's ID from authentication
      });

      const orderData = response.data;

      // Prompt to save the flavor as preferredCakeFlavors
      const savePreferred = window.confirm(`Do you want to save ${flavor} as a preferred flavor?`);
      if (savePreferred) {
        await axios.post('http://localhost:5000/api/users/preferred-flavors', {
          flavor,
          user: 'user_id', // Replace with actual user ID
        });
      }

      // Redirect to the Customize page with the newly created order ID
      navigate(`/customize/${orderData.order._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
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
        {/* Title and description */}
        <h1 className="display-4 font-weight-bold mb-3">Flavor Wonderland😊</h1>
        <p className="lead mb-4">
          Browse some of our amazing collection of cake flavours—though not all we can offer! Dive into a world of sweetness and find your favorite treat!
        </p>
      </div>

      {/* Cakes Grid */}
      <div className="row mt-4">
        {cakes.map((cake) => (
          <div className="col-md-4 mb-4" key={cake.id}>
            <div className="card shadow" style={{ borderRadius: '10px' }}>
              <img
                src={cake.imgUrl}
                className="card-img-top"
                alt={cake.name}
                style={{ borderRadius: '20px 20px 0 0', height: '400px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-2">{cake.name}</h5> {/* Cake name displayed under image */}
                <p className="card-text mb-4">{cake.description}</p> {/* Cake description */}
                <button
                  className="btn btn-lg"
                  style={{ backgroundColor: '#3e2c41', color: 'white' }}
                  onClick={() => handleCustomizeClick(cake.id, cake.name)} // Pass cake details
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

