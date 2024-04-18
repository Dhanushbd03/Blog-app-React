import React, { useEffect, useState } from "react";
import { Container, Input, Button } from "../components";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import service from "../appwrite/config";

const Profile = () => {
	const { register, handleSubmit } = useForm();
	const userData = useSelector((state) => state.auth.userData);

	const [image, addImage] = useState(false);
	const [pic, setPic] = useState("");
	const userId = userData?.$id;
	const img = pic?.Profilepic;

	const submit = async (data) => {
		const file = data.image[0]
			? await service.uploadProfile(data.image[0])
			: null;

		if (file) {
			const fileId = file.$id;
			data.Profilepic = fileId;

			service.getProfilePic(userId).then((pic) => {
				const Profilepic = service.createProfilePic({
					userId,
					Profilepic: fileId,
				});
				if (Profilepic) addImage(false);
			});

			const Profilepic = await service.createProfilePic({
				userId,
				Profilepic: fileId,
			});
			if (Profilepic) addImage(false);
		}
	};

	useEffect(() => {
		if (userId) {
			service
				.getProfilePic(userId)
				.then((pic) => {
					if (pic) setPic(pic);
				})
				.catch((error) => {
					console.error("Error fetching profile picture:", error);
				});
		}
	}, []);

	return (
		<div>
			<Container className=" mx-auto my-5">
				{!image ? (
					<div className=" p-10 mx-auto w-fit bg-gr rounded-xl text-bl flex mobile:block">
						<button
							type="button"
							onClick={() => {
								if (!pic) addImage(true);
							}}
						>
							<img
								src={service.getProfilePreview(pic.Profilepic)}
								alt="Add Your image"
								className="w-40 h-40 rounded-full bg-bl mb-5 mx-auto text-gr "
							/>
						</button>
						<div className="px-5 py-5">
							<h1>Name : {userData?.name}</h1>
							<h1>userId: {userData?.$id}</h1>
							<h1>Email: {userData?.email}</h1>
							<h1>Status: {userData?.status ? "active" : "inactive"}</h1>
						</div>
					</div>
				) : (
					<div className=" p-10 mx-auto w-fit bg-gr rounded-xl text-bl block mobile:block">
						<form onSubmit={handleSubmit(submit)}>
							<Input
								label="Add your Profile Picture"
								type="file"
								accept="image/png, image/jpeg, image/jpg"
								className="text-gr"
								{...register("image", { required: true })}
							/>
							<Button className="bg-bl text-gr" type="submit">
								Submit
							</Button>
						</form>
					</div>
				)}
			</Container>
		</div>
	);
};

export default Profile;
