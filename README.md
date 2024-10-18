# Crème de Cake

Welcome to **Crème de Cake**! 🎂 A delightful web application where you can customize and order your dream cakes. From flavors to designs, we offer a seamless experience for cake lovers.

## Table of Contents

- (#features)
- (#technologies-used)
- (#getting-started)
- (#installation)
- (#usage)
- (#api-endpoints)
- (#contributing)
- (#license)

## Features

- **Wide Variety of Cakes**: Choose from multiple cake flavors including Chocolate, Vanilla, Red Velvet, and more.
- **Customization Options**: Tailor your cake with different sizes, shapes, decorations, and personalized messages.
- **User Authentication**: Secure registration and login with Google OAuth integration.
- **Order Management**: Keep track of your orders and customize them as needed before checkout.
- **User Profile**: Manage your account details and preferred cake flavors easily.
- **Responsive Design**: Access the application from any device seamlessly.

## Technologies Used

- **Frontend**: 
  - React 18
  - Bootstrap for styling
  - Axios for API calls
- **Backend**: 
  - Node.js with Express
  - MongoDB for database management
  - Mongoose for modeling data
  - Mailgun for email services

## Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/creme-de-cake.git
   cd creme-de-cake

2. Frontend Setup:
	-cd frontend
	-npm install

3. Backend Setup:
	-cd backend
	-npm install

4.Environment Variables:
	*MONGODB_URI=your_mongodb_uri
	*MAILGUN_API_KEY=your_mailgun_api_key
	*MAILGUN_DOMAIN=your_mailgun_domain

5.Run the Application:
	*Backend
			#node app.js
	*Frontend
			#npm start

7.	**Usage**
		-Navigate to http://localhost:3000 in your browser to access the app.
		-Register or log in using your Google account.
		-Browse through our cake catalog, customize your selection, and proceed to checkout.

###API Endpoints###
$$ Authentication
	POST/api/auth/register: Register a new user.
	POST/api/auth/login: Log in an existing user.
$$ Cakes
	GET /api/cakes: Retrieve all available cakes.
	POST /api/cakes: Add a new cake (admin only).
$$ Customizations
	POST /api/customizations: Create a new cake customization.
	GET /api/customizations/:id: Retrieve customization details.
$$Orders
	POST /api/orders: Create a new order.
	GET /api/orders/:id: Retrieve order data

***Thank you for checking out Crème de Cake! We hope you enjoy creating and customizing your cake orders with us! 🍰***

