import { TablerSearch } from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const UserSignedIn = (props:{ uname: string }) => {
	return (
		<button onClick={() => signOut()} className="theme-button">
			{props.uname}
		</button>
	)
}

const UserSignedOut = () => {
	return (
		<button onClick={() => signIn("cognito")} className="theme-button">
			Sign In
		</button>
	)
}

export default function Nav() {
	const [username, setUsername] = useState("");
	const [nav, setNav] = useState(true);
	const { data: session, status } = useSession();

	async function userStatus() {
		if (status == "authenticated") {
			setUsername(session.user?.name || "")
			//const res = await fetch(`/api/putuser`, {
			//	method: "POST",
			//	headers: {
			//		"Content-Type": "application/json"
			//	},
			//	body: JSON.stringify({
			//		name: session.user?.name,
			//		email: session.user?.email,
			//		eimimedia: session.user?.email
			//	})
			//})
			//const data = await res.json()
			//console.log(data)
		}
	}

	function windowScroll(e:Event) {
		console.log(document.body.scrollTop)
		console.log("Scroll event")
	}

	useEffect(() => {
		userStatus()
	}, [status])

	useEffect(() => {
		window.addEventListener('scroll', (e) => {
			windowScroll(e)
		})
	}, [])

	return (
		<nav className={`w-full flex flex-row justify-between items-center p-4 fixed top-0 right-0 z-40 theme-bg-secondary transition-all ${nav ? "" : "-translate-y-20"}`}>
			<h1 className="text-2xl font-bold"> <a href="/"> EimiMedia </a> </h1>
			<ul className="flex gap-2">
				<li><a className="hover:theme-highlight" href="">Songs</a></li>
				<li><a className="hover:theme-highlight" href="">Gospel Songs</a></li>
				<li><a className="hover:theme-highlight" href="">Short Films</a></li>
				<li><a className="hover:theme-highlight" href="">Movies</a></li>
			</ul>
			<div className="flex flex-row gap-2 items-center border border-1 rounded-md">
				<div className="p-4">
					<TablerSearch />
				</div>
				<input className="bg-transparent p-1 focus:outline-none" type="text" placeholder="Search"/>
			</div>
			<div>
				{username != "" ? <UserSignedIn uname={username} /> : <UserSignedOut />}
			</div>
		</nav>
	)
}

