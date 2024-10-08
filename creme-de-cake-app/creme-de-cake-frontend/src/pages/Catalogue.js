import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css';

function Catalogue() {
  const cakes = [
    { id: 1, name: 'Chocolate Cake', description: 'Rich and moist chocolate cake.', imgUrl: 'https://via.placeholder.com/300x200' },
    { id: 2, name: 'Vanilla Cake', description: 'A classic and light vanilla cake.', imgUrl: 'https://via.placeholder.com/300x200' },
    { id: 3, name: 'Red Velvet Cake', description: 'Velvety smooth red cake with cream cheese frosting.', imgUrl: 'https://via.placeholder.com/300x200' },
    // Add more cakes as needed
  ];

  return (
    <div className="container" style={{ backgroundColor: '#e4ab63', minHeight: '100vh' }}>
      <h1 className="text-center text-white display-3">Cake Wonderland</h1>
      <p className="text-center text-white lead">Browse our amazing collection of cakes!</p>

      {/* Cakes Grid */}
      <div className="row mt-4">
        {cakes.map((cake) => (
          <div className="col-md-4 mb-4" key={cake.id}>
            <div className="card shadow" style={{ borderRadius: '10px' }}>
              <img src={cake.imgUrl} className="card-img-top" alt={cake.name} style={{ borderRadius: '10px 10px 0 0' }} />
              <div className="card-body">
                <h5 className="card-title">{cake.name}</h5>
                <p className="card-text">{cake.description}</p>
                {/* Change <a> to <Link> for navigation */}
                <Link to={`/customize/${cake.id}`} className="btn btn-dark" style={{ backgroundColor: '#5a3f2d' }}>
                  Customize
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;

