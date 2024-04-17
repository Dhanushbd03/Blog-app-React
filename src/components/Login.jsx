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
				}
				navigate("/");
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className=" flex justify-center text-gr w-full">
			<div className="h-full  p-10 text-center w-full sm:w-1/4 border-2 border-gr flex flex-col">
				<div className="flex justify-center pb-5">
					<span className="">
						<Logo />
					</span>
				</div>
				<h2 className="font-bold text-2xl pb-5">Sign in to Your account</h2>
				<p className="order-1">
					Don't have any account?&nbsp;
					<Link to="/signup" className="text-wht">
						Sign Up
					</Link>
				</p>
				{error && <p className="text-rd">{error}</p>}
				<form onSubmit={handleSubmit(login)} className="">
					<Input
						label="Email"
						placeholder=""
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
						label="Password"
						type="password"
						placeholder=""
						{...register("password", {
							required: true,
						})}
					/>
					<Button
						type="submit"
						children="Sign in"
						className="bg-gr active:bg-wht text-bl font-bold"
					/>
				</form>
			</div>
		</div>
	);
};

export default Login;
