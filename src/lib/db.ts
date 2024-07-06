import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient();

export const docClient = DynamoDBDocumentClient.from(dbClient);

export const createNewUser = async (userId: string, email: string) => {
	const randomUser = await fetch("https://randomuser.me/api/");
	const randomUserData = await randomUser.json();
	const imageUrl = randomUserData.results[0].picture.thumbnail;
	const command = new PutCommand({
		TableName: "EimiMediaUsers",
		Item: {
			userName: userId,
			userId: userId,
			email: email,
			imageUrl: imageUrl,
		},
	})
	try {
		const response = await docClient.send(command);
		console.log(response);
		return response;
	} catch (err) {
		console.error(err);
		return err;
	}
}
