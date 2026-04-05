import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

export const authenticate=(req,res,next)=>{
    try{
    const auth=req.headers?.authorization;
    if(!auth) return res.status(401).json({ 
        success: false,
        error: "Unauthorized" 
    });
    const token=auth.split(" ")[1];
    if(!token) return res.status(401).json({
        success: false,
        error:"No token found"
    })
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
    }
    catch(err)
    {
        next(err);
    }
}

export const isAdmin=(req,res,next)=>{
    if(req.user.role!=="admin"){
        return res.status(403).json({
            success: false,
            error: "Forbidden: Admin access required"
        });
    }
    next();
};

export const isActive=(req,res,next)=>{
    if(req.user.status!=="active"){
        return res.status(403).json({
            success: false,
            error: "Forbidden: Active user access required"
        });
    }
    next();
};

export const isAnalystOrAdmin=(req,res,next)=>{
    if(!['admin', 'analyst'].includes(req.user.role)){
        return res.status(403).json({
            success: false,
            error: "Forbidden: Analyst or Admin access required"
        });
    }
    next();
};
