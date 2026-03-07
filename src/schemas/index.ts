import * as z from "zod";

const expenseSchema = z.object({
  value: z.number().positive("Valor deve ser maior que 0"),
  description: z.string().min(1, "Descrição obrigatória"),
  currency: z.string().length(3),
  method: z.enum(["cash", "card", "bank_transfer"]),
  tag: z.string().min(1, "Categoria obrigatória"),
});

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

const registerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export { expenseSchema, loginSchema, registerSchema };