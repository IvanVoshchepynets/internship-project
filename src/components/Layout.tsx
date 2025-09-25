import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 flex flex-col items-center justify-center">
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
