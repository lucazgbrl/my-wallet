import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { z } from "zod";
import { RootState } from "@/store";

import { registerSchema } from "@/schemas";
import { registerUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="register-main">
      <h1>Criar conta</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nome
          <input type="text" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </label>

        <label>
          E-mail
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </label>

        <label>
          Senha
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar conta"}
        </button>

        {error && <p className="form-error">{error}</p>}
      </form>
    </main>
  );
}