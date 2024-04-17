import React from "react";

const Button = ({
	children,
	handleClick,
	type = "button",
	className = "",
	...props
}) => {
	return (
		<button
			className={`px-4 py-2 rounded-lg  ${className}`}
			{...props} 
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
