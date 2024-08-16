import { connection as db } from '../config/index.js'
import { createToken } from '../middleware/authenticateUser.js'
import { hash, compare } from 'bcrypt'


class Users{
    // All User Data
    fetchUsers(req,res){
        const strQry = `
        SELECT firstName, lastName, age, emailAdd, userRole, profileUrl FROM Users;
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
    }
    // Target A Single User
    fetchUser(req,res){
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
    }
    // Register A User
    async registerUser(req, res){
        try{
            let data = req.body
            data.password = await hash(data.password, 12)
            // payload
            let user = {
                emailAdd: data.emailAdd,
                password: data.password
            }
            let regQry = `
            INSERT INTO Users SET ?;
            `
            db.query(regQry, [data],(err)=>{
                if(err){
                    res.json({
                        status:res,statusCode,
                        msg:'This email already exists'
                    })
                }else{
                    const token = createToken(user)
                    res.json({
                        token,
                        msg:'you are registered'
                    })
                }
            })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    // Update User
    async updateUser(req,res){
        try{
            let data = req.body
            if (data.password){
                data.password = await hash(data.password, 12)
            }
            const strQry = `UPDATE Users SET ? WHERE userID = ${req.params.id}`
            db.query(strQry, [data], (err)=>{
                if(err) throw new Error(err)
                res.json({
                    status : res.statusCode,
                    msg: 'the sad part'
                })
            })
        }catch(e){
            res.json({
                status: 400,
                msg: e.message
            })
        }
    }
    // Delete
    deleteUser(req,res){
        try{
            const strQry = `
            DELETE FROM Users WHERE userID = ${req.params.id}
            `
    
            db.query(strQry, (err)=>{
                if (err) throw new Error(error)
                res.json({
                status: res.statusCode,
                msg: 'A user\' information was removed.'
            })
            })
        }catch(e){
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
    async loginUser(req, res){
        try{
            const {emailAdd, password} = req.body
            const strQry = `
            SELECT userID, firstName, lastName, age, emailAdd, userRole, profileUrl, password FROM Users WHERE emailAdd = '${emailAdd}'
            `
            db.query(strQry, async (err, result)=>{
                if(err) throw new Error('ok')
                if(!result?.length){
                    res.json({
                        status: 401,
                        msg: "You provided a wrong email"
                    })
                }else{
                    const isValidPass = await compare(password, result[0].password)
                    if(isValidPass){
                        const token = createToken({
                            emailAdd,
                            password
                        })
                        res.json({
                            status:res.statusCode,
                            token,
                            result: result[0]
                        })
                    }else{
                        res.json({
                            status: 401,
                            msg: e.message
                        })
                    }
                }
            })
        }catch(e){
            res.json({
                status: 401,
                msg: 'invalid password or you have not registered'
            })
        }
    }

}

export{
    Users
}