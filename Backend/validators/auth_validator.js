import zod from "zod"

export const registerSchema=zod.object({
  name: zod.string()
            .trim()
            .min(2,"Name must be at least 2 characters long")
            .max(50,"Name must be at most 50 characters long"),
  email: zod.string()
            .trim()
            .toLowerCase()
            .email("Invalid email address"),
  password: zod.string()
                .min(6, "Password must be at least 6 characters")
                .max(50, "Password must be at most 50 characters")
                .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                .regex(/[0-9]/, "Password must contain at least one number")
                .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

export const loginSchema=zod.object({
  email: zod.string()
            .trim()
            .toLowerCase()
            .email("Invalid email address"),
  password: zod.string()
                .min(6, "Incorrect password")
                .max(50, "Incorrect password")
});
