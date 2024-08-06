import express from 'express'
import path from 'path'
import { connection as db } from './config/index.js'
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
// Endpoint
router.get('^/$|/eShop', (req, res)=>{
    res.status(200).sendFile(path.resolve('./static/html/index.html'))
})
// all data
router.get('/Users', (req, res)=>{
    const strQry = `
    SELECT firstName, lastName, age, emailAdd FROM Users;
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

router.get('*'), (req, res) =>{
    res.json({
        status: 404,
        msg:'ahhhhh'
    })
}

// single user
router.get('/user/:id', (req, res) =>{
    try{
        const strQry =`
        SELECT firstName, lastName, age, emailAdd FROM Users WHERE userID = ${req.params.id};
        `
        db.query(strQry, (err, result)=>{
            if(err) throw new Error('error')
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
        })
    }
    catch(e){
        res.json({
            status: 404,
            msg: e.message
        })
    }
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})