import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";

const PostCard = ({ $id, title, featuredImage ,className=""}) => {
	return (
		<Link to={`/post/${$id}`}>
			<div className={`bg-gr rounded-xl m-4 p-4 sm:max-w-60 ${className}`}>
				<div className="w-full justify-center mb-4">
					<img
						src={`${service.getFilePreview(featuredImage)}`}
						alt={title}
						className="rounded-xl w-full h-48 min-w-40 object-cover "
					/>
				</div>
				<div className="flex justify-between">
					<h2 className="text-xl ">{title}</h2>
					<div className="">
						<LaunchIcon />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default PostCard;
