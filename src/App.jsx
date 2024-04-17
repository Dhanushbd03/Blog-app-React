import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
const App = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	return !loading ? (
		<div className="min-h-screen flex flex-wrap content-between bg-bl w-screen">
			<div className="w-full flex flex-col min-w-[355px] min-h-[270px] metal-regular">
				<Header />
				<main>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : null;
};

export default App;
