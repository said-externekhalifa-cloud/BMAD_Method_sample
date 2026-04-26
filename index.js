const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import database connection
const sequelize = require('./src/config/database');

// Synchronize models with database (create tables if they don't exist)
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API!');
});

// Routes
const productRoutes = require('./src/routes/productRoutes');
app.use('/api/products', productRoutes);

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
