'use server'
import { docClient } from "./db"
import { GetCommand } from "@aws-sdk/lib-dynamodb"

export const movieUpload = async (movie: any) => {
	console.log("Uploading movie to the database")
	console.log(movie)
}

export const getUserPermissions = async (email: string) => {
	'use server'
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
