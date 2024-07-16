'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getUserPermissions } from "@/lib/admin"
import AdminMovie from "@/components/AdminMovie"
import AdminSong from "@/components/AdminSong"
import AdminShort from "@/components/AdminShort"

export default function AdminPage() {
	const [confirmation, setConfirmation] = useState(false)
	const [tab, setTab] = useState("Song")
	const { data: session, status } = useSession()

	async function getPermissions() {
		const res = await getUserPermissions(session?.user?.email!)
		if (res.status != 200) {
			console.error(res.body)
		}
		setConfirmation(true)
		console.log("User is an admin")
	}

	useEffect(() => {
		if (!session?.user) {
			console.log("loading")
			return
		}
		if (!session?.user.email) {
			return
		}
		getPermissions()
	},[status])

	if (!confirmation) {
		return (
			<main className="w-full h-full flex flex-col gap-2 justify-center items-center">
				<h1>You do not have permissions to view this page</h1>
				<a href="/" className="hover:theme-highlight underlined">Go back to home page</a>
			</main>
		)
	}

	return (
		<main className="w-full h-full overflow-scroll">
			<nav className="w-full flex fixed bottom-0 max-w-[1000px] right-1/2 translate-x-1/2 theme-bg">
				<button onClick={() => setTab("Song")} className={`${tab == "Song" ? "bg-blue-400" : ""} p-4 grow hover:bg-blue-400 transition-all`}>Song</button>
				<button onClick={() => setTab("Movie")} className={`${tab == "Movie" ? "bg-blue-400" : ""} p-4 grow hover:bg-blue-400 transition-all`}>Movie</button>
				<button onClick={() => setTab("Short")} className={`${tab == "Short" ? "bg-blue-400" : ""} p-4 grow hover:bg-blue-400 transition-all`}>Short Film</button>
			</nav>
			<section className="w-full flex justify-center items-center">
				{tab == "Song" && <AdminSong />}
				{tab == "Movie" && <AdminMovie />}
				{tab == "Short" && <AdminShort />}
			</section>
		</main>
	)
}
