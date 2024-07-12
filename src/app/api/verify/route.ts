import { razorpayInstance } from "@/lib/razorpayinit";
import { validatePaymentVerification as validatePayment } from "razorpay/dist/utils/razorpay-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

	if (validatePayment({
		order_id: razorpay_order_id,
		payment_id: razorpay_payment_id,
	}, 
	razorpay_signature, 
	process.env.RAZORPAY_KEY_SECRET as string )) {
		return NextResponse.json({ success: true }, { status: 200 });
	} else {
		return NextResponse.json({ success: false }, { status: 400 });
	}
}
