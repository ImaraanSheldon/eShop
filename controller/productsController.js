import express from 'express'
import { products } from '../model/products.js'
import bodyParser from 'body-parser'

const productsRouter = express.Router()
productsRouter.use(bodyParser.json());
// Endpoint
// productsRouter.get('^/$|/eShop', (req, res)=>{
//     res.status(200).sendFile(path.resolve('./static/html/index.html'))
// })
// all data
productsRouter.get('/', (req, res)=>{
    products.fetchproductss(req,res);
})
// single products
productsRouter.get('/:id', (req, res) =>{
    products.fetchproducts(req,res);
})
// register products
productsRouter.post('/register', async(req, res)=>{
    products.registerproducts(req,res);
})
// update products
productsRouter.patch('/products/:id', async (req,res)=>{
    products.updateproducts(req,res);
})
productsRouter.delete('/delete/:id', (req, res)=>{
    products.deleteproductss(req,res);
})
productsRouter.post('/login', (req, res)=>{
    products.loginproducts(req,res);
})

export{
    productsRouter
}