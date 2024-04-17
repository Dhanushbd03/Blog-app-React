import React from "react";

const Logo = ({ width = "100px", classname }) => {
	return (
		<div>
			<img src="/mind-mingle.png" alt="" width={width} className={classname} />
		</div>
	);
};

export default Logo;
