import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	bucket;
	constructor() {
		this.client
			.setEndpoint(conf.appWriteUrl)
			.setProject(conf.appWriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}
	// Profile Config //
	async createProfilePic({ userId, Profilepic }) {
		try {
			return await this.databases.createDocument(
				conf.appWriteDatabaseId,
				conf.appWriteUserProfileCollectionId,
				userId,
				{
					Profilepic,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: create profile pic :: error", error);
		}
	}
	async getProfilePic(userId) {
		try {
			return await this.databases.getDocument(
				conf.appWriteDatabaseId,
				conf.appWriteUserProfileCollectionId,
				userId
			);
		} catch (error) {
			console.log("Appwrite service :: getProfilePic :: error", error);
			return false;
		}
	}
	getProfilePreview(fileId) {
		try {
			const result = this.bucket.getFilePreview(
				conf.appWriteUserBucketId,
				fileId
			);
			return result;
		} catch (error) {
			console.log("Appwrite service :: getProfilePreview :: error ", error);
		}
	}
	async deleteProfilepic(fileId) {
		try {
			await this.bucket.deleteFile(conf.appWriteUserBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteProfile pic  :: error ", error);
			return false;
		}
	}
	async uploadProfile(file) {
		try {
			return await this.bucket.createFile(
				conf.appWriteUserBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite service :: uploadProfile :: error ", error);
			return false;
		}
	}

	//post config to add to database
	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appWriteDatabaseId,
				conf.appWriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}
	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appWriteDatabaseId,
				conf.appWriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log("Appwrite service :: update post :: error", error);
		}
	}
	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appWriteDatabaseId,
				conf.appWriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log("appwrite service::deletePost ::error", error);
			return false;
		}
	}
	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appWriteDatabaseId,
				conf.appWriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite service :: getPost :: error", error);
			return false;
		}
	}
	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				conf.appWriteDatabaseId,
				conf.appWriteCollectionId,
				queries
			);
		} catch (error) {
			console.log("Appwrite Service:: getPosts :: error", error);
			return false;
		}
	}

	///file Upload service

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				conf.appWriteBucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite service :: uploadFile :: error ", error);
			return false;
		}
	}
	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite service :: deleteFile :: error ", error);
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			const result = this.bucket.getFilePreview(conf.appWriteBucketId, fileId);
			return result;
		} catch (error) {
			console.log("Appwrite service :: getFilePreview :: error ", error);
		}
	}
}

const service = new Service();
export default service;
