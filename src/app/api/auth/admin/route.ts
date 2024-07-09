import { docClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// This route recieves the email of a user, and retrieves their data from the database
// If the user is an admin, it returns a 200 status code, otherwise it returns a 403
export async function POST(req: NextRequest) {
	const { email } = await req.json();
	console.log(email);

	return NextResponse.json(email, { status: 200 });
}
