import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
	const id = useId();

	return (
		<div className="flex flex-col">
			{label && (
				<label htmlFor={id} className="text-xl">
					Status
				</label>
			)}
			<select
				name=""
				id={id}
				{...props}
				ref={ref}
				className="rounded-sm bg-bl border-2 border-gr mb-3 p-3"
			>
				{options?.map((option) => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default React.forwardRef(Select);
