import Record from '../models/record.js';

export const getSummary= async (req,res,next)=>{
    try{
    const totalIncome=await Record.aggregate([
        {
            $match: {
                type: "income"
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]);
    const totalExpenses=await Record.aggregate([
        {
            $match: {
                type: "expense"
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }
    ]);
    const NetBalance=(totalIncome[0]?.total || 0)-(totalExpenses[0]?.total || 0);
    res.status(200).json({
        success: true,
        message: "Summary retrieved successfully",
        totalIncome: totalIncome[0]?.total || 0,
        totalExpenses: totalExpenses[0]?.total || 0,
        netBalance: NetBalance
    });
} catch(err){
    next(err);
}
};

export const getMonthlySummary= async (req,res,next)=>{
    try{
    const year=parseInt(req.query.year);
    if(isNaN(year)){
        return res.status(400).json({
            success: false,
            message: "Invalid year parameter"
        });
    }
    const monthlySummary=await Record.aggregate([
        {
            $match: {
                $expr: { $eq: [{ $year: "$date" }, year] }
            }
        },
        {
            $group: {
                _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                totalIncome: { $sum: { $cond: { if: { $eq: ["$type", "income"] }, then: "$amount", else: 0 } } },
                totalExpenses: { $sum: { $cond: { if: { $eq: ["$type", "expense"] }, then: "$amount", else: 0 } } }
            }
        },
        {
            $sort: { "_id.month": 1 }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "Monthly summary retrieved successfully",
        monthlySummary
    });
} catch(err){
    next(err);
}
};

export const getMonthlySummaryCategoryWise= async (req,res,next)=>{
    try{
    const year=parseInt(req.query.year);
    const month=parseInt(req.query.month);
    if(isNaN(year) || isNaN(month) || month<1 || month>12){
        return res.status(400).json({
            success: false,
            message: "Invalid year or month parameter"
        });
    }
    const categorySummary=await Record.aggregate([
        {
            $match: {
                $expr: { $and: [
                    { $eq: [{ $year: "$date" }, year] },
                    { $eq: [{ $month: "$date" }, month] }
                ] }
            }
        },
        {
           $group: {
            _id: {
            type: "$type",
            category: "$category"
            },
          total: { $sum: "$amount" }
        }
        }
    ]);
    res.status(200).json({
        success: true,
        message: "Category-wise monthly summary retrieved successfully",
        categorySummary
    });
} catch(err){
    next(err);
}
};

export const filterByDateRange= async (req,res,next)=>{
    try{
    const { startDate, endDate } = req.query;

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
        return res.status(400).json({
            success: false,
            message: "Date must be in YYYY-MM-DD format"
        });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
            success: false,
            message: "Invalid date"
        });
    }
    const records=await Record.find({
        date: {
            $gte: start,
            $lte: end
        }
    }).sort({date:1});
    res.status(200).json({
        success: true,
        message: "Records retrieved successfully",
        records
    });
} catch(err){
    next(err);
}
};

export const filterByCategory= async (req,res,next)=>{
    try{
    const year=parseInt(req.query.year);
    const month=parseInt(req.query.month);
    const category=req.query.category;
    
    if(isNaN(year) || isNaN(month) || month<1 || month>12){
        return res.status(400).json({
            success: false,
            message: "Invalid year or month parameter"
        });
    }
    const records=await Record.find({
        $and: [
            { $expr: { $eq: [{ $year: "$date" }, year] } },
            { $expr: { $eq: [{ $month: "$date" }, month] } },
            { category: category }
        ]
    }).sort({date:1});
    res.status(200).json({
        success: true,
        message: "Records retrieved successfully",
        records
    });
} catch(err){
    next(err);
}
};

export const filterByType= async (req,res,next)=>{
    try{
    const year=parseInt(req.query.year);
    const month=parseInt(req.query.month);
    const type=req.query.type;

    if(isNaN(year) || isNaN(month) || month<1 || month>12){
        return res.status(400).json({
            success: false,
            message: "Invalid year or month parameter"
        });
    }
    if(!type || (type !== "income" && type !== "expense")){
        return res.status(400).json({
            success: false,
            message: "Invalid type parameter"
        });
    }
    const records=await Record.find({
        $and: [
            { $expr: { $eq: [{ $year: "$date" }, year] } },
            { $expr: { $eq: [{ $month: "$date" }, month] } },
            { type: type }
        ]
    }).sort({date:1});
    res.status(200).json({
        success: true,
        message: "Records retrieved successfully",
        records
    });
} catch(err){
    next(err);
}
};
