import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import service from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PostForm = ({ post }) => {
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.$id || "",
				content: post?.content || "",
				status: post?.status || true,
			},
		});

	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
console.log(userData);
	const [message, setMessage] = useState({
		text: "",
		error: false,
	});

	const submit = async (data) => {
		if (post) {
			const file = data.image[0]
				? await service.uploadFile(data.image[0])
				: null;
			if (file) {
				service.deleteFile(post.featuredImage);
			}
			const dbPost = await service.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			});
			if (dbPost) {
				navigate("/post/${dbPost.$id}");
			}
		} else {
			const file = data.image[0]
				? await service.uploadFile(data.image[0])
				: null;
			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await service.createPost({
					...data,
					userId: userData.$id,
				});
				if (dbPost) {
					setMessage({ text: "Post created successfully", error: false });
					navigate("/post/${dbPost.$id}");
				} else {
					setMessage({
						text: "there was a error in creating a post",
						error: true,
					});
				}
			}
		}
	};
	const slugTransform = useCallback((value) => {
		if (value && typeof value == "string") {
			return String(
				value
					.trim() // "Hello World 123!@#"
					.toLowerCase() // "hello world 123!@#"
					.replace(/[^a-zA-Z\d\s]/g, "") // "hello world 123"
					.replace(/\s+/g, "-")
					.slice(0, 5) +
					value
						.trim() // "Hello World 123!@#"
						.toLowerCase() // "hello world 123!@#"
						.replace(/[^a-zA-Z\d\s]/g, "") // "hello world 123"
						.replace(/\s+/g, "-")
						.slice(-5, -1)
			); // "hello-world-123"
		}

		return "";
	}, []);
	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title, { shouldValidate: true }));
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);
	return (
		<form onSubmit={handleSubmit(submit)} className="text-wht">
			<div>
				<Input
					label="Title"
					placeholder="Title"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug"
					placeholder="Slug"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), {
							shouldValidate: true,
						});
					}}
					disabled={true}
				/>
			</div>
			<div className="flex gap-10">
				<Input
					label="Featured image"
					type="file"
					className="w-full"
					accept="image/png ,image/jpg ,image/jpeg ,image/gif"
					{...register("image", { required: !post })}
				/>
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="w-full"
					{...register("status", { required: true })}
				/>
			</div>

			{post && (
				<div className="w-full mb-4">
					<img
						src={service.getFilePreview(post.featuredImage)}
						alt={post.title}
						className="rounded-lg"
					/>
				</div>
			)}

			<RTE
				label="Content"
				name="content"
				control={control}
				defaultValue={getValues("content")}
			/>
			<Button type="submit" className="bg-gr">
				{post ? "Update" : "Submit"}
			</Button>
			<p className={message.error ? `text-rd` : `text-wht`}>{message.text}</p>
		</form>
	);
};

export default PostForm;
