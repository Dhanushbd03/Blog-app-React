import React, { useId } from "react";

const Input = React.forwardRef(
	({ label, type = "text", className = "", ...props }, ref) => {
		const id = useId();

		return (
			<div>
				{label && <label htmlFor="id">{label}</label>}
				<input type={type} className="" ref={ref} {...props} id={id} />
			</div>
		);
	}
);

export default Input;
