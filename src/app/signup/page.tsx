'use client'
import type { SignUpOutput } from "aws-amplify/auth";
import { signUp } from "aws-amplify/auth"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./page.module.css"

export default function SignUp() {
	const [loading, setLoading] = useState(false);
	const [passwordInput, setPasswordInput] = useState(false);
	const router = useRouter();

	const PasswordHelper = () => {
		return (
			<div className={styles.passwordHelper}>Password should be more than 8 letters and contain combinations of a-z, A-Z, 0-9 and at least one special character</div>
		)
	}

	const Loading = () => {
		return (
			<div className={styles.loading}>Loading...</div>
		)
	
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const name = form.elements.namedItem("name") as HTMLInputElement;
		const email = form.elements.namedItem("email") as HTMLInputElement;
		const password = form.elements.namedItem("password") as HTMLInputElement;
		const confirm = form.elements.namedItem("confirm") as HTMLInputElement;

		if (password.value !== confirm.value) {
			alert("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const signUpRes:SignUpOutput = await signUp({
				username: email.value,
				password: password.value,
				options: {
					userAttributes: {
						name: name.value
					}
				}
			})

			if (signUpRes.nextStep) {
				alert("Sign up successful, please check your email for the confirmation code");
				router.push("/signup/confirm?email=" + email.value);
				return
			}

			console.log(signUpRes)
		} catch (error:any) {
			alert(error.message);
		}

		setLoading(false);
	}

	return (
		<main className={styles.main}>
			{loading && <Loading />}
			<h1>Sign Up to EimiMedia</h1>
			<form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
				<input type="text" name="name" placeholder="Name" required />
				<input type="email" name="email" placeholder="Email" required />
				{passwordInput && <PasswordHelper />}
				<input onFocusCapture={() => setPasswordInput(!passwordInput)} onBlur={() => setPasswordInput(false)} type="password" name="password" placeholder="Password" required />
				<input type="password" name="confirm" placeholder="Confirm Password" required />
				<input type="submit" value="Sign Up" />
				<hr />
				<div>Already have an account? <a href="/signin"> Sign In</a></div>
			</form>
		</main>
	)

}
