import express from 'express';
import { products } from '../model/index.js';
import bodyParser from 'body-parser';
import { verifyToken } from '../middleware/authenticateUser.js';

const productsRouter = express.Router();
productsRouter.use(bodyParser.json());

// Fetch all products
productsRouter.get('/',verifyToken, (req, res) => {
    products.fetchProducts(req, res);
});
// Fetch recent all products
productsRouter.get('/recent', (req, res) => {
    products.recentProducts(req, res);
});

// Fetch a single product by ID
productsRouter.get('/:id', (req, res) => {
    products.fetchProduct(req, res);
});

// Register a new product
productsRouter.post('/add',verifyToken, (req, res) => {
    products.addProduct(req, res);
});

// Update a product by ID
productsRouter.patch('/:id',verifyToken, (req, res) => {  // Corrected the endpoint path
    products.updateProduct(req, res);
});

// Delete a product by ID
productsRouter.delete('/:id',verifyToken, (req, res) => {
    products.deleteProduct(req, res);
});

export {
    productsRouter
};
