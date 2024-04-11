import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
const LogoutBtn = () => {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		authService
			.logout()
			.then(() => {
				dispatch(logout());
			})
			.catch((error) => {
				console.log("Error in logoutHandler : ", error);
			});
	};
	return (
		<button className="inline-block px-6 py-2 duration-200 hover:bg-gr hover:text-bl active:bg-opacity-70 rounded-full" onClick={logoutHandler}>
			Logout
		</button>
	);
};

export default LogoutBtn;
