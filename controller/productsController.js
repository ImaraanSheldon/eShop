
import express from 'express';
import { Products } from '../model/products.js';
import bodyParser from 'body-parser';

const productsRouter = express.Router();
productsRouter.use(bodyParser.json());

const products = new Products(); // Instantiate the Products class

// Fetch all products
productsRouter.get('/', (req, res) => {
    products.fetchProducts(req, res);
});

// Fetch a single product by ID
productsRouter.get('/:id', (req, res) => {
    products.fetchProduct(req, res);
});

// Register a new product
productsRouter.post('/register', async (req, res) => {
    products.registerProduct(req, res);
});

// Update a product by ID
productsRouter.patch('/:id', async (req, res) => {  // Corrected the endpoint path
    products.updateProduct(req, res);
});

// Delete a product by ID
productsRouter.delete('/delete/:id', (req, res) => {
    products.deleteProduct(req, res);
});

export {
    productsRouter
};
