import Script from "next/script";

export default function Checkout() {
	const createOrderId = async () => {
		try {
			const res = await fetch("/api/order", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					amount: 1,
					currency: "INR",
				}),
			})
			if (!res.ok) {
				throw new Error("Network response was not ok")
			}
			const data = await res.json()
			return data.orderId
		} catch (error) {
			console.error("Error:", error)
		}
	}
	return (
		<>
		  <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js"></Script>
		</>
	)
}
