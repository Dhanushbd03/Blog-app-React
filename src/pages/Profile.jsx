import React, { useState } from "react";
import { Container, Input, Button } from "../components";
import { useSelector } from "react-redux";
const Profile = () => {
	const userData = useSelector((state) => state.auth.userData);
	const [image, addImage] = useState(false);
	const submit = async (data) => {
		// const file = data.image[0];
		// console.log(file);
		addImage(false);
	};
	return (
		<div>
			<Container className=" mx-auto my-5">
				{image ? (
					<div className=" p-10 mx-auto w-fit bg-gr rounded-xl text-bl flex mobile:block">
						<button
							type="button"
							onClick={() => {
								addImage(true);
							}}
						>
							<img
								src=""
								alt=""
								className="w-40 h-40 rounded-full bg-bl mb-5 mx-auto"
							/>
						</button>
						<div className="px-5 py-5">
							<h1>Name puki: {userData?.name}</h1>
							<h1>userId: {userData?.$id}</h1>
							<h1>Email: {userData?.email}</h1>
							<h1>Status: {userData?.status ? "active" : "inactive"}</h1>
						</div>
					</div>
				) : (
					<div className=" p-10 mx-auto w-fit bg-gr rounded-xl text-bl block mobile:block">
						<Input
							label="Add your Profile Picture"
							type="file"
							accept="image/png image/jpeg image/jpg"
							className="text-gr"
						/>
						<Button
							className="bg-bl text-gr"
							type="submit"
							onClick={() => {
								addImage(true);
							}}
						>
							Submit
						</Button>
					</div>
				)}
			</Container>
		</div>
	);
};

export default Profile;
