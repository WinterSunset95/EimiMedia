'use client'
import type { ConfirmSignUpOutput } from "aws-amplify/auth";
import { confirmSignUp } from "aws-amplify/auth"
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css"

export default function ConfirmSignUp() {

	const router = useRouter();
	const params = useSearchParams();
	const email = params.get("email") || "";

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const email = form.elements.namedItem("email") as HTMLInputElement;
		const confirm = form.elements.namedItem("confirm") as HTMLInputElement;

		try {
			const confirmRes:ConfirmSignUpOutput = await confirmSignUp({
				username: email.value,
				confirmationCode: confirm.value
			})

			if (confirmRes.isSignUpComplete) {
				alert("Sign up successful");
				router.push("/signin");
				return
			}

		} catch (err: any) {
			alert(err.message)
		}

	}

	return (
		<main className={styles.main}>
			<h1>Confirm Email</h1>
			<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
				<input type="email" name="email" value={email} placeholder="Email" />
				<input type="text" name="confirm" placeholder="Enter Confirmation Code" />
				<input type="submit" value="Confirm" />
			</form>
		</main>
	);
}
