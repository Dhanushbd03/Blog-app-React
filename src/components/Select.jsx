import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
	const id = useId();

	return (
		<div>
			{label && <label htmlFor={id} className=""></label>}
			<select name="" id={id} {...props} ref={ref}>
				{options?.map((option) => {
					<option key={option} value={option}></option>;
				})}
			</select>
		</div>
	);
};

export default React.forwardRef(Select);
