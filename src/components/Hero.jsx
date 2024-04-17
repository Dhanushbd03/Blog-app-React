import React from "react";

const Hero = () => {
	return (
		<div className="flex justify-center flex-col ">
			<div className="p-5">
				<h1 className="text-5xl font-serif mobile:text-4xl">
					Blogs aren't just words, <br />
					they're the canvas of digital storytelling.
				</h1>
			</div>
			<div className="w-4/5 border-2 border-gr p-5 m-auto flex">
				<div className="w-full  justify-center flex mobile:block  ">
					<img
						src="/left.jpg"
						alt=""
						className="w-1/3 rounded-tl-full mobile:w-full mobile:object-cover mobile:h-[20vh] "
					/>
					<img
						src="/florian-klauer-mk7D-4UCfmg-unsplash.jpg"
						alt=""
						className=" w-1/3 mobile:object-center mobile:w-full mobile:object-cover mobile:h-[20vh]"
					/>
					<img
						src="/right.jpg"
						alt=""
						className="w-1/3 rounded-br-full mobile:w-full mobile:object-cover mobile:h-[20vh]"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
