import type { RazorPayOrderResponse, RazorPayOrderError } from "@/lib/interfaces";
import { razorpayInstance } from "@/lib/razorpayinit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { amount, currency, orderType, orderId } = body;

	console.log("body: ", body);
	if (!amount || !currency || !orderType || !orderId) {
		return new Response(JSON.stringify("amount and currency are required"), { status: 400 });
	}

	const options = {
		amount: amount,
		currency: currency,
	}

	try {
		const order = await razorpayInstance.orders.create(options)
		console.log("order: ", order);
		return NextResponse.json(order, { status: 200 });
	} catch (err) {
		return NextResponse.json(err, { status: 500 });
	}


}
