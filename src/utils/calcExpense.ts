import { RootState } from '../store';

export const selectTotalBRL = (state: RootState) =>
  state.wallet.expenses.reduce((sum, e) => sum + Number(e.valueBRL), 0);
