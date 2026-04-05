import zod from "zod"

export const recordSchema=zod.object({
    amount: zod.number("Amount must be a number")
               .positive("Amount must be a positive number"),
    type: zod.enum(["income","expense"], "Type must be either 'income' or 'expense'"),
    category: zod.enum(["food","rent","utilities","others"], "Category must be one of 'food', 'rent', 'utilities', or 'others'"),
    date: zod
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
  .transform((val) => new Date(val)),
    description: zod.string()
                 .trim()
                 .min(5, "Description must be at least 5 characters long")
                 .max(200, "Description must be at most 200 characters long")   
})