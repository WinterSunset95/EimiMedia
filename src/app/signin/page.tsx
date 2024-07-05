'use client';
import type { SignInOutput } from "aws-amplify/auth"
import { useState } from "react";
import { signIn, signInWithRedirect } from "aws-amplify/auth"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"

export default function SignIn() {
	const [loading, setLoading] = useState(false)

	const router = useRouter()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		setLoading(true)
		e.preventDefault()
		const form = e.currentTarget as HTMLFormElement
		const email = form.elements.namedItem("email") as HTMLInputElement
		const password = form.elements.namedItem("password") as HTMLInputElement

		try {
			const signInRes:SignInOutput = await signIn({
				username: email.value,
				password: password.value
			})

			if (signInRes.isSignedIn) {
				setLoading(false)
				alert("Sign in successful")
				router.push("/")
				return
			}

			if (signInRes.nextStep) {
				setLoading(false)
				alert("Sign in successful, please check your email for the confirmation code")
				router.push("/signup/confirm?email=" + email.value)
				return
			}
		} catch (err:any) {
			alert(err.message)
		}
		setLoading(false)
	}

	const Loading = () => {
		return (
			<div className={styles.loading}>Loading . . .</div>
		)
	}

	return (
		<main className={styles.main}>
			<h1>Sign in to your EimiMedia account</h1>
			<form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
				{loading && <Loading />}
				<input
					type="email"
					name="email"
					placeholder="Email"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
				/>
				<input type="submit" value="Login" />
				<hr />
				<div>Don't have an account? <a href="/signup">Sign Up</a></div>
			</form>
		</main>
	)
}
