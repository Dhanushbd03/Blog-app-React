const conf = {
	appWriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
	appWriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
	appWriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
	appWriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
	appWriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
	appWriteUserBucketId: String(import.meta.env.VITE_APPWRITE_USER_BUCKET_ID),
	appWriteUserProfileCollectionId: String(import.meta.env.VITE_APPWRITE_USER_PROFILE_COLLECTION_ID)
};
export default conf;
