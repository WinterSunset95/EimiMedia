// Name: razorpay.ts
// Description: Initialize the Razorpay instance and show the Razorpay payment form
// Last modified: 12/7/2024, 00:48
import Razorpay from 'razorpay';
import { Orders } from "razorpay/dist/types/orders";
import { loadJavaScript } from './helpers';

export const razorpayInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID!,
	key_secret: process.env.RAZORPAY_KEY_SECRET!
})

export async function showRazorPay(order: Orders.RazorpayOrder, url: string) {
	let response = await loadJavaScript("https://checkout.razorpay.com/v1/checkout.js");
	if (!response) {
		alert("Razorpay SDK failed to load. Are you online?");
		return;
	}

	const options = {
		"key": "rzp_test_VDw4wFmtkCoCa6",
		"amount": order.amount!,
		"currency": order.currency!,
		"name": "Eimi Media",
		"description": "Eimi Media Purchase",
		"image": "/images/logo.png",
		"order_id": order.id!,
		"handler": async (response: any) => {
			const res = await fetch("/api/verify", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(response)
			})
			const data = await res.json();
			if (data.success) {
				alert("Payment successful, trying to rent movie.");
				window.location.replace(url);
			} else {
				alert("Payment failed");
				window.location.replace("/");
			}
		}
	}

	const paymentObject = new (window as any).Razorpay(options);

	paymentObject.open();
}
