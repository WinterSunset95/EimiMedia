// Name: helpers.ts
// Description: Helper functions used in the project

// Load a JavaScript file dynamically
// Called from:
// - razorpay.ts
export async function loadJavaScript(url: string) {
	return new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = url;
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.body.appendChild(script);
	});
}

