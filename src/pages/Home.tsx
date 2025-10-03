import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdSlot from "../ads/AdSlot";
import { AuthForm } from "../components/AuthForm";
import Button from "../components/Button";
import Layout from "../components/Layout";
import {
	type LoginSchema,
	loginSchema,
	type RegisterSchema,
	registerSchema,
} from "../schemas/authSchemas";
import { useAuthStore } from "../store/auth";
import { sendStat } from "../utils/stats";

const Home = () => {
	const adId = useId();
	const [formType, setFormType] = useState<"login" | "register" | null>(null);
	const { login, isAuthenticated, username, logout } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		sendStat("pageLoad_Home");
	}, []);

	const onLogin = (data: LoginSchema) => {
		login(data.username);
		sendStat("login", { username: data.username });
		navigate("/news");
	};

	const onRegister = (data: RegisterSchema) => {
		console.log("Mock реєстрація:", data);
		alert("Реєстрація успішна!");
		sendStat("register", { username: data.username });
		setFormType("login");
	};

	return (
		<Layout>
			{!formType && (
				<div className="flex gap-4">
					<Button onClick={() => setFormType("login")}>Вхід</Button>
					<Button onClick={() => setFormType("register")}>Реєстрація</Button>
				</div>
			)}

			{formType === "login" && (
				<AuthForm<LoginSchema>
					schema={loginSchema}
					fields={[
						{ name: "username", label: "Логін", type: "email" },
						{ name: "password", label: "Пароль", type: "password" },
					]}
					onSubmit={onLogin}
				/>
			)}

			{formType === "register" && (
				<AuthForm<RegisterSchema>
					schema={registerSchema}
					fields={[
						{ name: "name", label: "Імʼя" },
						{ name: "username", label: "Логін", type: "email" },
						{ name: "password", label: "Пароль", type: "password" },
					]}
					onSubmit={onRegister}
				/>
			)}
			{import.meta.env.VITE_ENABLE_ADS === "true" && (
				<div className="container mx-auto p-4">
					<AdSlot id={adId} width={300} height={250} />
				</div>
			)}
		</Layout>
	);
};

export default Home;
