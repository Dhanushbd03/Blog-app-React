import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useParams, useNavigate } from "react-router-dom";
const EditPost = () => {
	const [post, setPosts] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (slug) {
			service.getPost(slug).then((post) => {
				if (post) {

					setPosts(post);
				}
			});
		} else {
			navigate("/all-posts");
		}
	}, [slug, navigate]);
	return post ? (
		<div className="">
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
};

export default EditPost;
