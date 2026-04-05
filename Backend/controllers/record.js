import Record from "../models/record.js"
import { recordSchema } from "../validators/record_validator.js"

export const addRecord= async (req,res,next)=>{
    try{
    const result = recordSchema.safeParse(req.body);
    const {amount,type,category,date,description}=req.body;
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid record data",
            errors: result.error.issues[0].message 
        });
    }
    const newRecord = await Record.create({
        amount,
        type,
        category,
        date,
        description,
        createdBy: req.user._id
    })
    res.status(201).json({
        success: true,
        message: "Record added successfully",
        record: newRecord
    })
} catch(err){
    next(err);  
}
};

export const viewRecord= async (req,res,next)=>{
    try{
    const record=await Record.findById(req.params.id);
    if(!record){
        return res.status(404).json({
            success: false,
            message: "Record not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Record retrieved successfully",
        record: record
    });
} catch(err){
    next(err);
}
};

export const viewAllRecords= async (req,res,next)=>{
    try{
    const page=parseInt(req.query.page) || 1;
    const limit=15;
    const skip=(page-1)*limit;
    const records=await Record.find({})
    .sort({date:-1})
    .skip(skip)
    .limit(limit);
    const totalrecords=await Record.countDocuments();
    res.status(200).json({
        success: true,
        page: page,
        totalRecords: totalrecords,
        totalPages: Math.ceil(totalrecords/limit),
        message: "Records retrieved successfully",
        records: records
    });
} catch(err){
    next(err);
 }
};

export const deleteRecord= async (req,res,next)=>{
    try{
    await Record.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Record deleted successfully"
    });
} catch(err){
    next(err);
}
};

export const updateRecord= async (req,res,next)=>{
    try{
    const result = recordSchema.safeParse(req.body);
    const {amount,type,category,date,description}=req.body;
    if (!result.success) {
        return res.status(400).json({   
            success: false,
            message: "Invalid record data",
            errors: result.error.issues[0].message 
        });
    }
    const updatedRecord = await Record.findByIdAndUpdate(req.params.id,{ // assuming the person updating the record is the creator of that record
        amount,
        type,
        category,
        date,
        description,
        createdBy: req.user._id
    }, { new: true });

    res.status(200).json({
        success: true,
        message: "Record updated successfully",
        record: updatedRecord
    });
} catch(err){
    next(err);
}
};

