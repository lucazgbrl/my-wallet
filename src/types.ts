import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from './store';
import { z } from 'zod';
import { expenseSchema, loginSchema, registerSchema } from './schemas';

// Usuário
export type User = {
  id: number;
  name: string;
  email: string;
};

// Estado do formulário de despesas
export type FormState = {
  value: number; // Valor como string para entrada do formulário
  description: string; // Descrição da despesa
  currency: string; // Código da moeda (ex.: "USD")
  method: string; // Método de pagamento (ex.: "Dinheiro")
  tag: string; // Categoria da despesa (ex.: "Alimentação")
};

// Despesa registrada
export type Expense = {
  id: number; // ID único da despesa
  userId: number; // ID do usuário que registrou a despesa
  value: string | number; // Valor em string (formulário) ou número (processamento)
  exchangeRate: number; // Taxa de câmbio para conversão
  valueBRL: number; // Valor convertido para BRL
  description?: string; // Descrição da despesa
  currency: string; // Código da moeda
  method: string; // Método de pagamento
  tag: string; // Categoria da despesa
  createdAt?: string; // Data de criação da despesa
  user?: User; // Informações do usuário (opcional)
};

// Tipo para Dispatch com suporte ao Redux Thunk
export type Dispatch = ThunkDispatch<RootState, null, AnyAction>;

export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
