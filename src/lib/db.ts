// Name: db.ts
// Description: Initialize the DynamoDB client
// Last modified: 12/7/2024, 00:44
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient();

export const docClient = DynamoDBDocumentClient.from(dbClient);
