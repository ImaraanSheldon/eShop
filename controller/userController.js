import express from 'express';
import { Users } from '../model/users.js';
import bodyParser from 'body-parser';
import path from 'path';

const userRouter = express.Router();
const users = new Users(); // Instantiate the Users class

// Middleware to parse JSON requests
userRouter.use(bodyParser.json());

// Serve the main HTML file
userRouter.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'));
});

// Fetch all users
userRouter.get('/', (req, res) => {
    users.fetchUsers(req, res);
});

// Fetch a single user by ID
userRouter.get('/:id', (req, res) => {
    users.fetchUser(req, res);
});

// Register a new user
userRouter.post('/register', async (req, res) => {
    await users.registerUser(req, res);
});

// Update a user by ID
userRouter.patch('/user/:id', async (req, res) => {
    await users.updateUser(req, res);
});

// Delete a user by ID
userRouter.delete('/delete/:id', async (req, res) => {
    await users.deleteUser(req, res);
});

// Login a user
userRouter.post('/login', async (req, res) => {
    await users.loginUser(req, res);
});

export {
    userRouter
};
