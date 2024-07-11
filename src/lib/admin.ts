// Name: admin.ts
// Description: Server functions for the admin page
// Last modified: 12/7/2024, 00:38
'use server'
import { docClient } from "./db"
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import type { MovieResult } from "./interfaces"
import { fromIni } from "@aws-sdk/credential-providers"

// Add a movie to the dynamodb database
// Called from:
// - components/AdminMovie.tsx
export const addMovieToDatabase = async (movie: MovieResult) => {
	console.log(movie)
	const command = new PutCommand({
		TableName: "EimiListedMovies",
		Item: movie
	})
	return docClient.send(command)
}

// Get a signed URL for uploading an image to S3
// Called from:
// - components/AdminMovie.tsx
export const getImageUploadUrl = async (key:string) => {
	const client = new S3Client({
		credentials: fromIni(),
		region: process.env.AWS_REGION
	})
	const command = new PutObjectCommand({
		Bucket: process.env.S3_BUCKET!,
		Key: `image/${key}.jpg`,
		ContentType: "image/jpeg",
		ACL: "public-read"
	})
	return getSignedUrl(client, command, { expiresIn: 600 })
}

// Get a signed URL for uploading a movie to S3
// Called from:
// - components/AdminMovie.tsx
export const getMovieUploadUrl = async (key:string) => {
	const client = new S3Client({
		credentials: fromIni(),
		region: process.env.AWS_REGION
	})
	const command = new PutObjectCommand({
		Bucket: process.env.S3_BUCKET!,
		Key: `movie/${key}.mp4`,
		ContentType: "video/mp4",
		ACL: "public-read"
	})
	return getSignedUrl(client, command, { expiresIn: 3600 })
}

// Check if the user is an admin. For the admin page
// Called from:
// - admin/page.tsx
export const getUserPermissions = async (email: string) => {
	// Look up the user in the database
	const command = new GetCommand({
		TableName: "EimiMediaUsers",
		Key: {
			email: email
		}
	})

	// User not found on the database
	const result = await docClient.send(command)
	if (!result.Item) {
		return {
			status: 404,
			body: "Error looking up the user in the database"
		}
	}

	// User not in group "admin"
	const groups = result.Item.groups
	if (!groups) {
		return {
			status: 404,
			body: "User found but does not have a 'groups' field"
		}
	}
	if (!groups.includes("admin")) {
		return {
			status: 404,
			body: "User is not an admin"
		}
	}
	return {
		status: 200,
		body: "User is an admin"
	}
}
