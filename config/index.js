import {createPool} from "mysql2";
import "dotenv/config"
import { error } from "console"

let connection = createPool({
    host:process.env.hostDb,
    user: process.env.userDb,
    password: process.env.passwordDb,
    database: process.env.dbName,
    multipleStatements: true,
    connectionLimit: 30
})
connection.on('connection',(err)=>{
    if(err) throw new Error('Unable to Connect ^(--)^')
})
export{
    connection
}