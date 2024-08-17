import { userRouter } from "./controller/userController.js";
import { productsRouter } from "./controller/productsController.js";
import path from 'path'
import express from 'express'
import bodyParser from "body-parser";


// Create an express app
const app = express();
const port = process.env.PORT || 4000;

// Routers
app.use((req,res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    next()
})

app.use('/users', userRouter);
app.use('/products', productsRouter);

// Middleware
app.use(express.static('./static'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint
app.get('^/$|/eShop', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/html/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});