import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import Button from "../Button";
const Header = () => {
	const authStatus = useSelector((state) => state.auth.status);
	const [menu, setMenu] = React.useState(false);

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
		{
			name: "Profile",
			slug: "/profile",
			active: authStatus,
		},
	];
	const className = "mobile:hidden";
	const handleClick = () => {
		setMenu(!menu);
	};
	return (
		<header className=" shadow border-2 border-gr text-gr w-full bg-bl">
			<Container className="mx-auto ">
				<nav className="flex w-full mobile:justify-between">
					<div className="flex ">
						<Link to="/" className="">
							<Logo classname="py-1" />
						</Link>
					</div>

					<ul className="flex ml-auto mobile:flex mobile:flex-col ">
						<Button
							className="hidden mobile:block mt-7 mr-3 scroll-smooth hover:bg-gr hover:text-bl  "
							handleClick={handleClick}
						>
							Menu
						</Button>
						{navItems.map((item) => {
							return item.active ? (
								<li
									key={item.slug}
									className={`py-6 ${menu ? "mobile:flex" : "mobile:hidden"}  `}
								>
									<button
										onClick={() => {
											navigate(item.slug);
											setMenu(false);
										}}
										className="inline-block px-6 duration-200 hover:bg-gr rounded-full py-2 hover:text-bl "
									>
										{item.name}
									</button>
								</li>
							) : null;
						})}

						{authStatus && (
							<li className={`py-6 ${menu ? "mobile:flex" : "mobile:hidden"}`}>
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
