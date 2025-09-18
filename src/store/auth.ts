import { create } from "zustand";

interface AuthState {
	isAuthenticated: boolean;
	username: string | null;
	login: (username: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	isAuthenticated: !!localStorage.getItem("username"),
	username: localStorage.getItem("username"),
	login: (username) => {
		localStorage.setItem("username", username);
		set({ isAuthenticated: true, username });
	},
	logout: () => {
		localStorage.removeItem("username");
		set({ isAuthenticated: false, username: null });
	},
}));
