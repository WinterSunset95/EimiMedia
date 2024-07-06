import { docClient } from "@/lib/db";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const handler = async (req: any, res: any) => {
	const randomUser = await fetch("https://randomuser.me/api/");
	const randomUserData = await randomUser.json();
	const imageUrl = randomUserData.results[0].picture.thumbnail;

	// Decode the readable stream into a JSON object.
	const body = await req.json();
	const { name, email, eimimedia } = body;

	const command = new PutCommand({
		TableName: "EimiMediaUsers",
		Item: {
			eimimedia: eimimedia,
			name: name,
			email: email,
			image: imageUrl,
		},
	})

	try {
		const response = await docClient.send(command);
		console.log(response);
		return new Response(JSON.stringify("success"));
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify(err));
	}
}

export { handler as POST };
