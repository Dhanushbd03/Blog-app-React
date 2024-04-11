import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
const Header = () => {
	
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];
	return (
		<header className=" shadow bg-bl border-2 border-gr text-gr ">
			<Container>
				<nav className="flex">
					<div className="">
						<Link to="/" className="">
							<Logo classname="py-4" />
						</Link>
					</div>
					<ul className="flex ml-auto">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.slug }className="py-6">
									<button
										onClick={() => navigate(item.slug)}
										className="inline-block px-6 duration-200 hover:bg-gr rounded-full py-2 hover:text-bl"
									>
										{item.name}

									</button>
								</li>
							) : null
						)}
						{authStatus && (
							<li className="py-6">
								<LogoutBtn />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
