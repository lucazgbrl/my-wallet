import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema } from "../schemas";
import { useAppDispatch } from "../store/hooks";
import { createExpense } from "../store/walletSlice";
import { ExpenseFormData } from "@/types";

const WalletForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, 
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "BRL"
  ];

  const onSubmit = async (data: ExpenseFormData) => {
    await dispatch(createExpense(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <label>
        Valor
        <input
          type="number"
          step="0.01"
          {...register("value", { valueAsNumber: true })}
        />
        {errors.value && <span>{errors.value.message}</span>}
      </label>

      <label>
        Descrição
        <input type="text" {...register("description")} />
        {errors.description && <span>{errors.description.message}</span>}
      </label>

      <label>
        Moeda
        <select {...register("currency")}>
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Método
        <select {...register("method")}>
          <option value="cash">Dinheiro</option>
          <option value="card">Cartão</option>
          <option value="bank_transfer">Transferência</option>
        </select>
      </label>

      <label>
        Categoria
        <input type="text" {...register("tag")} />
        {errors.tag && <span>{errors.tag.message}</span>}
      </label>

      <button type="submit">
        Adicionar despesa
      </button>

    </form>
  );
}

export default WalletForm;
