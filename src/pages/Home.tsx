import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(3, "Логін мінімум 3 символи"),
  password: z.string().min(6, "Пароль мінімум 6 символів"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Імʼя мінімум 2 символи"),
  username: z.string().min(3, "Логін мінімум 3 символи"),
  password: z.string().min(6, "Пароль мінімум 6 символів"),
});

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;

const Home = () => {
  const [formType, setFormType] = useState<"login" | "register" | null>(null);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  // Логін форма
  const {
    register: loginReg,
    handleSubmit: handleLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onLogin = (data: LoginSchema) => {
    login(data.username);
    navigate("/news");
  };

  // Реєстрація форма
  const {
    register: regReg,
    handleSubmit: handleRegister,
    formState: { errors: regErrors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onRegister = (data: RegisterSchema) => {
    console.log("Mock реєстрація:", data);
    alert("Реєстрація успішна!");
    setFormType("login"); // після реєстрації переключаємо на логін
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {!formType && (
          <div className="flex gap-4">
            <Button onClick={() => setFormType("login")}>Вхід</Button>
            <Button onClick={() => setFormType("register")}>Реєстрація</Button>
          </div>
        )}

        {formType === "login" && (
          <form
            onSubmit={handleLogin(onLogin)}
            className="w-80 p-6 border rounded mt-6"
          >
            <h2 className="text-lg font-bold mb-4">Вхід</h2>
            <Input
              label="Логін"
              {...loginReg("username")}
              error={loginErrors.username?.message}
            />
            <Input
              label="Пароль"
              type="password"
              {...loginReg("password")}
              error={loginErrors.password?.message}
            />
            <Button type="submit">Увійти</Button>
          </form>
        )}

        {formType === "register" && (
          <form
            onSubmit={handleRegister(onRegister)}
            className="w-80 p-6 border rounded mt-6"
          >
            <h2 className="text-lg font-bold mb-4">Реєстрація</h2>
            <Input
              label="Імʼя"
              {...regReg("name")}
              error={regErrors.name?.message}
            />
            <Input
              label="Логін"
              {...regReg("username")}
              error={regErrors.username?.message}
            />
            <Input
              label="Пароль"
              type="password"
              {...regReg("password")}
              error={regErrors.password?.message}
            />
            <Button type="submit">Зареєструватися</Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
