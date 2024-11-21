import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Catalogue() {
  const navigate = useNavigate();

  const cakes = [
  { name: 'Marble Cake', description: 'A delicious blend of vanilla and chocolate swirled together, creating a beautiful marbled pattern.', imgUrl: '/images/marble-cake.jpg', flavor: 'Marble' },
  { name: 'Vanilla Cake', description: 'A light, fluffy, and moist classic cake, perfect for any occasion.', imgUrl: '/images/vanilla-cake.jpg', flavor: 'Vanilla' },
  { name: 'Orange Cake', description: 'Zesty, citrusy cake made with fresh orange juice and zest for a refreshing flavor.', imgUrl: '/images/orange-cake.jpg', flavor: 'Orange' },
  { name: 'Banana Cake', description: 'A moist and soft cake made with ripe bananas and topped with creamy frosting.', imgUrl: '/images/banana-cake.jpg', flavor: 'Banana' },
  { name: 'Pinacolada Cake', description: 'Tropical cake made with pineapple and coconut, delivering a refreshing taste.', imgUrl: '/images/pinacolada-cake.jpg', flavor: 'Pinacolada' },
  { name: 'Fruit Cake', description: 'A rich, dense cake loaded with dried fruits and nuts, often soaked in brandy or rum.', imgUrl: '/images/fruit-cake.jpg', flavor: 'Fruit' },
  { name: 'Lemon Cake', description: 'Tangy and refreshing cake infused with lemon juice and zest.', imgUrl: '/images/lemon-cake.jpg', flavor: 'Lemon' },
  { name: 'Red Velvet', description: 'Velvety smooth red cake with cream cheese frosting.', imgUrl: '/images/red-velvet.jpg', flavor: 'Red Velvet' },
  { name: 'Chocolate Cake', description: 'Rich, moist chocolate cake made with cocoa or melted chocolate.', imgUrl: '/images/chocolate-cake.jpg', flavor: 'Chocolate' },
  { name: 'Black Forest Cake', description: 'Layers of chocolate sponge, whipped cream, and cherries, topped with chocolate shavings.', imgUrl: '/images/black-forest-cake.jpg', flavor: 'Black Forest' },
  { name: 'White Forest Cake', description: 'A white chocolate version of the Black Forest, with cream and fruit fillings.', imgUrl: '/images/white-forest-cake.jpg', flavor: 'White Forest' },
  { name: 'Eggless Cake', description: 'A soft and dense cake made without eggs, suitable for vegetarians or those with egg allergies.', imgUrl: '/images/eggless-cake.jpg', flavor: 'Eggless' },
  { name: 'Pineapple Cake', description: 'A sweet, moist cake made with fresh pineapple, perfect for tropical dessert lovers.', imgUrl: '/images/pineapple-cake.jpg', flavor: 'Pineapple' },
  { name: 'Blueberry Cake', description: 'A moist cake filled with fresh or frozen blueberries, often paired with a light cream glaze.', imgUrl: '/images/blueberry-cake.jpg', flavor: 'Blueberry' },
  { name: 'Coffee Cake', description: 'A flavorful cake infused with deep coffee flavor, often topped with cinnamon and nuts.', imgUrl: '/images/coffee-cake.jpg', flavor: 'Coffee' },
  { name: 'Cheesecake', description: 'A rich, creamy dessert made with cream cheese and a graham cracker crust, perfect for indulgence.', imgUrl: '/images/cheesecake.jpg', flavor: 'Cheesecake' },
  { name: 'Carrot Cake', description: 'A spiced cake made with grated carrots, walnuts, and topped with cream cheese frosting.', imgUrl: '/images/carrot-cake.jpg', flavor: 'Carrot' },
  { name: 'Coconut Cake', description: 'A fluffy and moist cake with a coconut flavor, topped with shredded coconut for texture.', imgUrl: '/images/coconut-cake.jpg', flavor: 'Coconut' },
  { name: 'Fudge Cake', description: 'A dense and rich chocolate cake with a gooey fudge center, ideal for chocolate lovers.', imgUrl: '/images/fudge-cake.jpg', flavor: 'Fudge' },
  { name: 'Mint Cake', description: 'A refreshing cake flavored with mint, often paired with chocolate for a cool, delicious treat.', imgUrl: '/images/mint-cake.jpg', flavor: 'Mint' },
  { name: 'Chocolate Chip Cake', description: 'A soft and fluffy cake loaded with chocolate chips, offering bursts of melted chocolate with every bite.', imgUrl: '/images/chocolate-chip-cake.jpg', flavor: 'Chocolate Chip' },
  { name: 'Royal Velvet Cake', description: 'An elegant variation of the classic red velvet, richer in flavor with sophisticated frosting and decoration.', imgUrl: '/images/royal-velvet-cake.jpg', flavor: 'Royal Velvet' },
  { name: 'Amarula Cake', description: 'A moist cake flavored with Amarula cream liqueur, perfect for a boozy dessert experience.', imgUrl: '/images/amarula-cake.jpg', flavor: 'Amarula' },
  { name: 'Strawberry Cake', description: 'A sweet and fruity cake made with fresh strawberries, perfect for summer celebrations.', imgUrl: '/images/strawberry-cake.jpg', flavor: 'Strawberry' },
];


    const handleCustomizeCake = (cake) => {
    const { flavor } = cake;
    // Navigate to Customize.js with the selected flavor
    navigate('/customize', { state: { flavor } });
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: '#f5e1a4',
        minHeight: '100vh',
        color: '#3e2c41',
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
            <div className="card shadow-sm" style={{ borderRadius: '10px' }}>
              <img
                src={cake.imgUrl}
                className="card-img-top"
                alt={cake.name}
                style={{
                  borderRadius: '10px 10px 0 0',
                  height: '300px',
                  objectFit: 'cover',
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-2">{cake.name}</h5>
                <p className="card-text">{cake.description}</p>
                <button
                  className="btn btn-primary btn-lg mt-3"
                  style={{ backgroundColor: '#3e2c41', color: 'white' }}
                  onClick={() => handleCustomizeCake(cake)}
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

