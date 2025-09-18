import { useAuthStore } from "../store/auth";

const Header = () => {
	const { isAuthenticated, username, logout } = useAuthStore();

	return (
		<header className="bg-blue-600 text-white p-4 flex justify-between items-center">
			<h1 className="text-xl font-bold">News App</h1>

			{isAuthenticated && (
				<div className="flex items-center gap-4">
					<span>{username}</span>
					<button
						type="button"
						onClick={logout}
						className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
					>
						Вийти
					</button>
				</div>
			)}
		</header>
	);
};

export default Header;
