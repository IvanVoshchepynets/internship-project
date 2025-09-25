import { z } from "zod";

const NAME_REGEX = /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/;

export const loginSchema = z.object({
	username: z.string().email("Введіть коректний логін"),
	password: z.string().min(6, "Пароль мінімум 6 символів"),
});

export const registerSchema = z.object({
	name: z
		.string()
		.min(2, "Імʼя мінімум 2 символи")
		.regex(NAME_REGEX, "Імʼя повинно містити лише букви"),
	username: z.string().email("Введіть коректний логін"),
	password: z.string().min(6, "Пароль мінімум 6 символів"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
