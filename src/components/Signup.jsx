import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
const Signup = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState("");
	const { register, handleSubmit } = useForm();
	const signup = async (data) => {
		setError("");
		try {
			const userData = await authService.createAccount(data);
			if (userData) {
				const userData = await authService.getCurrentUser();
				if (userData) {
					dispatch(login(userData));
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
				<h2 className="">Signup for an account</h2>
				<p className="">
					Already have an account?
					<Link to="/login" className="">
						Login
					</Link>
				</p>
				{error && <p className="">{error}</p>}
				<form onSubmit={handleSubmit(signup)}>
					<div className="">
						<Input
							label="Name"
							placeholder="your name"
							{...register("name", {
								required: true,
							})}
						/>
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
						<Button type="submit" children="Signup"  />{" "}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
