import express from 'express'
import { Users } from '../model/users'
import bodyParser from 'body-parser'

const userRouter = express.Router()
userRouter.use(bodyParser.json());
// Endpoint
userRouter.get('^/$|/eShop', (req, res)=>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
// all data
userRouter.get('/', (req, res)=>{
    Users.fetchUsers(req,res);
})
// single user
userRouter.get('/:id', (req, res) =>{
    Users.fetchUser(req,res);
})
// register user
userRouter.post('/register', async(req, res)=>{
    Users.registerUser(req,res);
})
// update user
userRouter.patch('/user/:id', async (req,res)=>{
    Users.updateUser(req,res);
})
userRouter.delete('/delete/:id', (req, res)=>{
    Users.deleteUsers(req,res);
})
userRouter.post('/login', (req, res)=>{
    Users.loginUser(req,res);
})

export{
    userRouter
}