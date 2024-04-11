import React, { useCallback, useEffect } from "react";
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
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || true,
			},
		});
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	console.log(userData.$id);

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
					navigate("/post/${dbPost.$id}");
				}
			}
		}
	};
	const slugTransform = useCallback((value) => {
		if (value && typeof value == "string") {
			return value
				.trim() // "Hello World 123!@#"
				.toLowerCase() // "hello world 123!@#"
				.replace(/[^a-zA-Z\d\s]/g, "") // "hello world 123"
				.replace(/\s+/g, "-"); // "hello-world-123"
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
				/>

				<Input
					label="Featured image"
					type="file"
					className=""
					accept="image/png ,image/jpg ,image/jpeg ,image/gif"
					{...register("image", { required: !post })}
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
			<Select
				options={["active", "inactive"]}
				label="Status"
				className="w-full"
				{...register("status", { required: true })}
			/>
			<RTE
				label="Content"
				name="content"
				control={control}
				defaultValue={getValues("content")}
			/>
			<Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
				{post ? "Update" : "Submit"}
			</Button>
		</form>
	);
};

export default PostForm;
