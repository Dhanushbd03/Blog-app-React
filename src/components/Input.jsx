import React, { useId } from "react";

const Input = React.forwardRef(
	({ label, type = "text", className = "", ...props }, ref) => {
		const id = useId();

		return (
			<div className="flex flex-col text-left align-middle ">
				{label && (
					<label htmlFor="id" className=" text-xl">
						{label}
					</label>
				)}
				<input
					type={type}
					className="placeholder:bg-bl placeholder:opacity-25 bg-bl border-2 border-gr mb-3 p-3"
					ref={ref}
					{...props}
					id={id}
					required
				/>
			</div>
		);
	}
);

export default Input;
