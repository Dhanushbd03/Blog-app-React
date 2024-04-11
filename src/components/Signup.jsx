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
		<div className="flex justify-center text-gr">
			<div className="h-full p-10 text-center sm:w-3/12  border-2 border-gr flex flex-col ">
				<div className="flex justify-center pb-5">
					<span className="">
						<Logo />
					</span>
				</div>
				<h2 className="font-bold text-2xl pb-5">Signup for an account</h2>
				<p className="order-1">
					Already have an account?&nbsp;
					<Link to="/login" className="text-wht">
						Login
					</Link>
				</p>
				{error && <p className="text-rd">{error}</p>}
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
							label="Password"
							type="password"
							placeholder="[a-z][A-Z][0-9][!,@,#,$,%,^,&,*]"
							{...register("password", {
								required: true,
							})}
						/>
						<Button type="submit" children="Signup"  className="text-bl font-bold bg-gr" />{" "}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
