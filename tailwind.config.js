/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				mobile: { max: "460px" }
				
				// => @media (max-width: 500px) { ... }
			},
		},
		colors: {
			bl: "#222831",
			gr: "#76ABAE",
			rd: "rgb(255,0,0)",

			wht: "#EEEEEE",
		},
	},
	plugins: [],
};
