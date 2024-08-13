import express from 'express'
import path from 'path'
import { Users } from './model/users'
import bodyParser from 'body-parser'

// Create an express app
const app = express()
const port = process.env.PORT || 4000
const router = express.Router()
// Middleware
app.use(router, 
    express.static('./static'),
    express.json(),
    express.urlencoded({
        extended:true
}))
router.use(bodyParser.json());
// Endpoint
router.get('^/$|/eShop', (req, res)=>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
// all data
router.get('/Users', (req, res)=>{
    Users.fetchUsers(req,res);
})
// single user
router.get('/user/:id', (req, res) =>{
    Users.fetchUser(req,res);
})
// register user
router.post('/register', async(req, res)=>{
    Users.registerUser(req,res);
})
// update user
router.patch('/user/:id', async (req,res)=>{
    Users.updateUser(req,res);
})
router.delete('/delete/:id', (req, res)=>{
    Users.deleteUsers(req,res);
})
router.post('/login', (req, res)=>{
    Users.loginUser(req,res);
})
router.get('*'), (req, res) =>{
    Users.errorUniversal(req,res);
}
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})