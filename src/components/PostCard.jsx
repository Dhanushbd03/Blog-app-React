import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, featuredImage }) => {
	
	return (
		<Link to={`/post/${$id}`}>
			<div className="bg-gr rounded-xl m-4 p-4">
				<div className="w-full justify-center mb-4">
					<img
						src={service.getFilePreview(featuredImage)}
						alt={title}
						className="rounded-xl w-full h-48 min-w-40"
					/>
				</div>
				<h2 className="text-xl">{title}</h2>
			</div>
		</Link>
	);
};

export default PostCard;
