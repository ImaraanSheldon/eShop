import express from 'express'
import path from 'path'
import { connection } from './config/index.js'
// Create an express app
const app = express()
const port = process.env.PORT
const router = express.Router()
// Middleware
app.use(router, express.static('./static'))
// Endpoint
router.get('^/$|/eShop', (req, res)=>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})