import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' //alphanumeric key that we can use to authenticate the user when they make future network requests without needing them to require to login again
import prisma from '../prismaClient.js';

const router = express.Router();
//register a new user /auth/register endpoint
router.post('/register',async (req, res)=>{
    const {username, password} = req.body;

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password,8)
    // save the new user adn hashed password to the db

    try{
        const user = await prisma.user.create({
            data:{
                username: username,
                password: hashedPassword
            }
        })
        // now that we have a user lets add a default todo
        const defaultTodo = `Hellow :) Add your first todo!`
        await prisma.todo.create({
            data:{
                task: defaultTodo,
                userId: user.id
            }
        })
        // create a token

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})

    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    try{
        const user = await prisma.user.findUnique({
            where:{
                username: username
            }
        })
        if(!user){
            return res.status(404).send({message: "User not found"})
        }
        //synchronously tests the passwords entered by the user compares to the encrypted password
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        
        if(!passwordIsValid){
            return res.status(401).send({message: "Invalid Password"});
        }
        // if we pass this guard clause means that the user is valid
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        console.log("token is: ", token);
        res.json({token})
        
    }catch(err){
        console.log(err.message);
        res.sendStatus(503);
    }
})

export default router;