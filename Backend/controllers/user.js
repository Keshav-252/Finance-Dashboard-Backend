import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { registerSchema,loginSchema } from "../validators/auth_validator.js"
import dotenv from "dotenv"

dotenv.config();

export const register= async (req,res,next) => {
    try{
        const result = registerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues[0].message });
        }
        const {name,email,password}=result.data;
        const existingUser=await User.findOne({email})  
        if(existingUser) return res.status(400).json({error:"Email already exists"})

        const hashed=await bcrypt.hash(password,10); // algorithm will perform 10 rounds of hashing
        const user=await User.create({name,email,password:hashed});
        if(user){
            res.status(201).json({
                success: true,
                message:"User registered successfully"})
        }
    }
    catch(error){
        next(error);
    }

}

export const login= async (req,res,next) => {
    try{
        const result = loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.issues[0].message });
        }
        const {email,password}=result.data;
        const user=await User.findOne({email})
        if(!user)  return res.status(401).json({error:"User does not exist"})
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.status(401).json({error:"invalid password"}) 
        }
        const token=jwt.sign({_id:user._id, role:user.role, status:user.status},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({
            success: true,
            token,
            message: "Login successful"
        });
    }
    catch(error){
        next(error);
    }

}