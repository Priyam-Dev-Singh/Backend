import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' //alphanumeric key that we can use to authenticate the user when they make future network requests without needing them to require to login again
import db from '../db.js'

const router = express.Router();

router.post('/register',(req, res)=>{

})

router.post('/login', (req, res)=>{
    
})

export default router;