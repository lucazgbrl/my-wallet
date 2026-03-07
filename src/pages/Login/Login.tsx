import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootState } from "@/store";

import { loginSchema } from "@/schemas";
import { login } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { Link, useNavigate } from "react-router-dom";

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();  
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate('/wallet');
    } catch (err) {
      console.error(err);
      console.log("Login failed:", error);
    }
  };

  return (
    <main className="login-main">
      <h1>My Wallet</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          E-mail
          <input
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>
        <label>
          Senha
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>
        <button type="submit" disabled={loading || errors.email !== undefined || errors.password !== undefined}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p>
          Não tem conta? <Link to="/register">Criar conta</Link>
        </p>

        {error && <p className="form-error">{error}</p>}
      </form>
    </main>
  );
}