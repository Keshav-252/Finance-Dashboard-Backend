import User from '../models/user.js';

export const getAllUsers= async (req,res,next)=>{
    try{
    const users=await User.find({}).select('-password').sort({createdAt:-1});
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        users: users
    });
} catch(err){
    next(err);
}};

export const updateUserRole= async (req,res,next)=>{
    try{
    const user=await User.findById(req.params.id).select('-password');
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    if(!req.body.role){
        return res.status(400).json({
            success: false,
            message: "Role is required"
        });
    }
    if(!['viewer', 'analyst', 'admin'].includes(req.body.role)){
        return res.status(400).json({
            success: false,
            message: "Invalid role value"
        });
    }
    user.role=req.body.role;
    await user.save();
    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user: user
    });
} catch(err){
    next(err);
}};

export const updateUserStatus= async (req,res,next)=>{
    try{
    const user=await User.findById(req.params.id).select('-password');  
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    if(!req.body.status){
        return res.status(400).json({
            success: false,
            message: "Status is required"
        });
    }
    if(!['active', 'inactive'].includes(req.body.status)){
        return res.status(400).json({
            success: false,
            message: "Invalid status value"
        });
    }
    user.status=req.body.status;
    await user.save();
    res.status(200).json({
        success: true,
        message: "User status updated successfully",
        user: user
    });
} catch(err){
    next(err);
}};

