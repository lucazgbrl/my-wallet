import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { api } from "../services/api";
import { Expense, ExpenseFormData } from "../types";

export interface WalletState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  expenses: [],
  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk(
  "wallet/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/expenses/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch expenses");
    }
  }
);

export const createExpense = createAsyncThunk(
  "wallet/createExpense",
  async (data: ExpenseFormData) => {
    const response = await api.post("/expenses", data);
    return response.data;
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addMatcher(isPending(fetchExpenses, createExpense), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejected(fetchExpenses, createExpense), (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Ocorreu um erro";
      });
  },
});

export default walletSlice.reducer;