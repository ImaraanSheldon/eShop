import express from 'express'
import path from 'path'
import { connection as db } from './config/index.js'
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
router.get('/users', (req, res)=>{
    const strQry = `
    SELECT firstName, lastName, age, emailAdd FROM User;
    `
    db.query(strQry, (err, results)=>{
        try{
            if(err) throw new Error('Unable to find Users')
                res.json({
                    status: res.statusCode,
                    results      
                })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
        
    })  
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
    // console.log(`${strQry}`)
})