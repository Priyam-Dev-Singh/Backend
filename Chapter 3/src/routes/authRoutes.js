import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' //alphanumeric key that we can use to authenticate the user when they make future network requests without needing them to require to login again
import db from '../db.js'

const router = express.Router();
//register a new user /auth/register endpoint
router.post('/register',(req, res)=>{
    const {username, password} = req.body;

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password,8)
    // save the new user adn hashed password to the db

    try{
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?,?)`)
        const result = insertUser.run(username, hashedPassword)
        console.log(result)
        // now that we have a user lets add a default todo
        const defaultTodo = 'Hello :) Add your first todo!'
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?,?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)
        // create a token

        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})

    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login', (req, res)=>{
    const {username, password} = req.body;

    try{
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
        const user = getUser.get(username);

        if(!user){
            return res.status(404).send({message: "User not found"})
        }
    }catch(err){
        console.log(err.message);
        res.sendStatus(503);
    }
})

export default router;