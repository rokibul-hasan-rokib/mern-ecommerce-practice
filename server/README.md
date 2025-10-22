# MERN E-commerce Backend

A comprehensive backend API for an e-commerce application built with Node.js, Express.js, and MongoDB.

## Features

- **Product Management**: Complete CRUD operations for products
- **User Management**: User registration, authentication, and profile management
- **Order Management**: Order creation, tracking, and management
- **Review System**: Product reviews and ratings
- **Search & Filter**: Advanced product search and filtering
- **Pagination**: Efficient data pagination
- **Error Handling**: Comprehensive error handling middleware
- **Security**: JWT authentication and role-based authorization
- **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Mongoose schema validation
- **CORS**: Cross-Origin Resource Sharing
- **Logging**: Morgan HTTP request logger

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   ├── db.js          # Database connection
│   │   └── .env           # Environment variables
│   ├── controllers/
│   │   ├── productController.js    # Product CRUD operations
│   │   ├── userController.js       # User management
│   │   └── orderController.js      # Order management
│   ├── middlewares/
│   │   ├── auth.js        # Authentication middleware
│   │   ├── error.js       # Error handling middleware
│   │   └── catchAsyncErrors.js     # Async error wrapper
│   ├── models/
│   │   ├── Product.js     # Product schema
│   │   ├── User.js        # User schema
│   │   └── Order.js       # Order schema
│   ├── routes/
│   │   ├── productRoutes.js        # Product routes
│   │   ├── userRoutes.js           # User routes
│   │   └── orderRoutes.js          # Order routes
│   └── utils/
│       ├── errorHandler.js         # Error handler class
│       ├── apiFeatures.js          # API features (search, filter, pagination)
│       └── jwtToken.js             # JWT token utilities
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Installation

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in `src/config/` directory with the following variables:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://127.0.0.1:27017/db_mern_practice
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=5d
   COOKIE_EXPIRE=5
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Run the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Products

- **GET /api/v1/products** - Get all products (with search, filter, pagination)
- **GET /api/v1/product/:id** - Get single product details
- **POST /api/v1/admin/products/new** - Create new product (Admin only)
- **PUT /api/v1/admin/product/:id** - Update product (Admin only)
- **DELETE /api/v1/admin/product/:id** - Delete product (Admin only)
- **GET /api/v1/products/category/:category** - Get products by category
- **GET /api/v1/products/stats** - Get product statistics

### Reviews

- **PUT /api/v1/review** - Create or update product review (Authenticated users)
- **GET /api/v1/reviews** - Get product reviews (Authenticated users)
- **DELETE /api/v1/reviews** - Delete review (Admin only)

### Users

- **POST /api/v1/register** - Register new user
- **POST /api/v1/login** - User login
- **GET /api/v1/logout** - User logout
- **GET /api/v1/me** - Get user profile (Authenticated users)
- **PUT /api/v1/password/update** - Update password (Authenticated users)
- **PUT /api/v1/me/update** - Update profile (Authenticated users)
- **GET /api/v1/admin/users** - Get all users (Admin only)
- **GET /api/v1/admin/user/:id** - Get single user (Admin only)
- **PUT /api/v1/admin/user/:id** - Update user role (Admin only)
- **DELETE /api/v1/admin/user/:id** - Delete user (Admin only)

### Orders

- **POST /api/v1/order/new** - Create new order (Authenticated users)
- **GET /api/v1/order/:id** - Get single order (Authenticated users)
- **GET /api/v1/orders/me** - Get user's orders (Authenticated users)
- **GET /api/v1/admin/orders** - Get all orders (Admin only)
- **PUT /api/v1/admin/order/:id** - Update order status (Admin only)
- **DELETE /api/v1/admin/order/:id** - Delete order (Admin only)

## API Features

### Product Search & Filter
- Search by product name or description
- Filter by price range, category, ratings
- Sort by price, ratings, created date
- Pagination support

### Authentication
- JWT-based authentication
- Role-based authorization (User/Admin)
- Secure password hashing with bcryptjs
- HTTP-only cookies for token storage

### Error Handling
- Global error handling middleware
- Custom error classes
- Validation error handling
- MongoDB error handling

## Database Models

### Product Schema
- name, description, price, category
- stock management
- image uploads support
- ratings and reviews system
- created by user reference

### User Schema
- name, email, password
- avatar support
- role-based permissions
- password reset functionality
- JWT token generation

### Order Schema
- shipping information
- order items with product references
- payment information
- order status tracking
- total price calculation

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- Input validation
- CORS configuration
- HTTP-only cookies
- Rate limiting ready

## Development

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented yet)

### Environment Variables
- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT token expiration time
- `COOKIE_EXPIRE` - Cookie expiration time in days
- `NODE_ENV` - Environment mode (development/production)
- `FRONTEND_URL` - Frontend application URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.
