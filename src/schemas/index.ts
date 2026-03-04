import * as z from "zod";

const expenseSchema = z.object({
  description: z.string().min(1),
  value: z.number().positive(),
  category: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { expenseSchema, loginSchema };