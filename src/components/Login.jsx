import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");

	const login = async (data) => {
		setError("");
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) {
					dispatch(authLogin(userData));
					navigate("/");
				}
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="">
			<div className="">
				<div className="">
					<span className="">
						<Logo />
					</span>
				</div>
				<h2 className="">Sign in to Your account</h2>
				<p className="">
					Don't have any account?
					<Link to="/signup" className="">
						Sign Up
					</Link>
				</p>
				{error && <p className="">{error}</p>}
				<form onSubmit={handleSubmit(login)} className="">
					<div className="">
						<Input
							label="Email:"
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(
											value || "Email address must be a valid address"
										),
								},
							})}
						/>
						<Input
							label="password"
							type="password"
							placeholder="password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button 
							type="submit"
							children="Sign in"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
