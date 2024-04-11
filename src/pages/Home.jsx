import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		service.getPosts().then((posts) => {
			if (posts) {
				setPosts(posts.documents);
			}
		});
	}, []);
	const user = useSelector((state) => state.auth.status);

	if (!user) {
		return (
			<div className="w-full py-8 mt-0 text-center bg-bl mb-56 text-wht ">
				<Container>
					<div className="flex flex-wrap justify-center ">
						<div className="p-2 w-full ">
							<h1 className="text-5xl">Login to read Posts</h1>
						</div>
					</div>
				</Container>
			</div>
		);
	}
	if (posts.length === 0) {
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
		<div className="w-full  text-center bg-bl  text-wht ">
			<Container>
				<div className="flex flex-wrap">
					{posts.map((post) => {
						
						return (
							<div key={post.$id} className="p-4" >
								<PostCard {...post} />
							</div>
						);
					})}
				</div>
			</Container>
		</div>
	);
};

export default Home;
