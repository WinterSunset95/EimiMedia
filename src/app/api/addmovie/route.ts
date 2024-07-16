import { docClient } from "@/lib/db";
import { QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const { userEmail, movieId, redirectUrl } = Object.fromEntries(url.searchParams);
	if (!userEmail || !movieId) {
		return new Response(JSON.stringify("userEmail and movieId are required"), { status: 400 });
	}

	// Append to the user's rentedMovies map with the current time as int
	const currentTime = new Date().getTime();
	const query = new UpdateItemCommand({
		TableName: "EimiMediaUsers",
		Key: {
			email: { S: userEmail },
		},
		UpdateExpression: "ADD rentedMovies.#movieId :currentTime",
		ExpressionAttributeNames: {
			"#movieId": movieId,
		},
		ExpressionAttributeValues: {
			":currentTime": { N: currentTime.toString() },
		},
	})

	try {
		const data = await docClient.send(query);
		if (data.$metadata.httpStatusCode !== 200) {
			const errorHtml = `<h1>Error: ${data.$metadata.httpStatusCode}</h1><pre>${JSON.stringify(data)}</pre>`;
			return new Response(errorHtml, { status: 500 });
		}
		const successHtml = `<script>alert("Successfully rented the movie"); window.location.replace("${redirectUrl}")</script>`;
		return new Response(successHtml, { status: 200, headers: { "Content-Type": "text/html" } });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify(error), { status: 500 });
	}
}

