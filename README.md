# E-commerce Website

## Project Description
This project is a simple e-commerce website developed using React.js for the frontend and Node.js for the backend. The website allows users to browse products, view product details, manage their cart, and perform user authentication.

## Technologies Used
- **Frontend:** React.js (TypeScript)
- **Backend:** Node.js (TypeScript), Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Project Structure
The project structure is divided into two main directories:
- **Frontend:** Contains the React.js frontend code.
- **Backend:** Contains the Node.js backend code.

### Backend Setup (Node.js)
1. Set up a Node.js server with Express.js.
2. Implemented routes for CRUD operations on products.
3. Created routes for user authentication.

### Database Integration
1. Connected the Node.js server to a MongoDB database.
2. Created schemas/models for products and users.
3. Implemented CRUD operations for products and user authentication using Mongoose.

### Running the Application Locally
To run the application locally, follow these steps:

1. **Backend Setup:**
   - Navigate to the `Backend` directory.
   - Run `npm install` to install dependencies.
   - Start the development server with `npm run dev`.

2. **Frontend Setup:**
   - Navigate to the `Frontend` directory.
   - Run `npm install` to install dependencies.
   - Start the development server with `npm run dev`.

### API Endpoints
- Product Management:
  - `GET /api/products`: Get all products.
  - `GET /api/products/:id`: Get product by ID.
  - `POST /api/products`: Create a new product (authenticated).
  - `PUT /api/products/:id`: Update a product (authenticated).
  - `DELETE /api/products/:id`: Delete a product (authenticated).
- User Authentication:
  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Login with existing credentials.
- Cart Management:
  - `GET /api/cart`: Get cart items (authenticated).
  - `POST /api/cart/add`: Add an item to the cart (authenticated).
  - `PUT /api/cart/:id`: Update a cart item (authenticated).
  - `DELETE /api/cart/:id`: Remove a cart item (authenticated).

## Highlights
- Both frontend and backend are implemented using TypeScript for enhanced type safety.
- Utilized Express.js for efficient routing and middleware handling on the backend.
- Integrated MongoDB as the database for storing product and user data.
- Implemented user authentication using JSON Web Tokens (JWT) for secure access to protected routes.
