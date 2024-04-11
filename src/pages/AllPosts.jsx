import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";

const AllPosts = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {}, []);
	service.getPosts([]).then((posts) => {
		if (posts) {
			setPosts(posts.documents);
		}
	});
	if (posts.length===0) {
		return (
			<div className="w-full py-8 mt-0 text-center bg-bl mb-56 text-wht">
				<Container>
					<div className="flex flex-wrap ">
						<div className="p-2 w-full ">
							<h1 className="text-5xl">No Blogs Yet</h1>
						</div>
					</div>
				</Container>
			</div>
		);
	}
	return (
		<div className="w-full py-8">
			<Container>
				<div className="">
					{posts.map((post) => (
						<div key={post.$id} className="">
							<PostCard post={posts} />
						</div>
					))}
				</div>
			</Container>
		</div>
	);
};

export default AllPosts;
