import { razorpayInstance } from "@/lib/razorpay";

async function handler(req: Request) {
	const body = await req.json();
	const { amount, currency } = body;

	return new Response(JSON.stringify("hello from the payment route"), { status: 200 });
}

export { handler as POST };
