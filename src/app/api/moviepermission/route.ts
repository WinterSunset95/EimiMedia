import { docClient } from "@/lib/db"
import { QueryCommand, GetItemCommand } from "@aws-sdk/client-dynamodb"
import { User } from "@/lib/interfaces"
import { permission } from "process"

async function handler(req:Request) {
	// First get the body from the readable stream
	const body = await req.json()
	if (!body) {
		return new Response("Bad Request", { status: 400 })
	}
	if (!body.email && !body.password) {
		return new Response("No email and password", { status: 400 })
	}

	const query = new GetItemCommand({
		TableName: "EimiMediaUsers",
		Key: {
			email: { S: body.email },
		}
	})

	try {
		const data = await docClient.send(query)
		if (!data.Item) {
			return new Response("No data", { status: 404 })
		}

		// So we have a user, let's check if movieId is a part of the user's rentedMovies list
		const user = data.Item

		const typedUser: User = {
			userId: user.userId.S!,
			name: user.name.S!,
			given_name: user.given_name.S!,
			email: user.email.S!,
			rentedMovies: user.rentedMovies.L?.map((movie) => movie.S!) || [],
			groups: user.groups.L?.map((group) => group.S!) || [],
			image: user.image.S!,
		}

		if (typedUser.rentedMovies.length < 0) {
			return new Response(JSON.stringify({
				permission: "denied",
			}), { status: 200 })
		}

		// Check if the movieId is in the user's rentedMovies list
		if (typedUser.rentedMovies.includes(body.movieId)) {
			return new Response(JSON.stringify({
				permission: "granted",
			}), { status: 200 })
		} else {
			return new Response(JSON.stringify({
				permission: "denied",
			}), { status: 200 })
		}

	} catch (error) {
		console.error(error)
		return new Response(JSON.stringify(error), { status: 500 })
	}
}

export { handler as POST }
