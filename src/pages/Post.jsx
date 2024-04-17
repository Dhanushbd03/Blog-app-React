import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";

const Post = () => {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	
	const isAuthor = post && userData ? post.userId === userData.$id : false;
	useEffect(() => {
		if (slug) {
			service.getPost(slug).then((post) => {
				if (post) {
					setPost(post);
				} else {
					navigate("/");
				}
			});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);
	const deletePost = () => {
		service.deletePost(post.$id).then((status) => {
			if (status) {
				service.deleteFile(post.featuredImage);
				navigate("/all-posts");
			}
		});
	};

	return post ? (
		<div className="w-full  text-center bg-bl  text-bl ">
			<Container className="bg-gr m-5 rounded-xl p-5 flex flex-col mx-auto ">
				<div className="flex justify-between ">
					<h1 className="py-2 px-4 text-4xl">{post.title}</h1>
					{/* <p>{userData.name}</p> */}
					{isAuthor && (
						<div className="">
							<Link to={`/edit-post/${post.$id}`}>
								<Button className="bg-bl mx-2 my-2 text-gr">Edit</Button>
							</Link>
							<Button className="bg-bl text-gr" handleClick={deletePost}>
								Delete
							</Button>
						</div>
					)}
				</div>
				<div className="mt-10 ">
					<img
						src={service.getFilePreview(post.featuredImage)}
						alt={post.title}
						className="
						px-5
						min-h-72
						max-h-screen
						
						float-left object-center object-cover "
					/>
					<div className="order-2  text-justify px-5">
						{parse(String(post.content))}
					</div>
				</div>
			</Container>
		</div>
	) : null;
};

export default Post;
