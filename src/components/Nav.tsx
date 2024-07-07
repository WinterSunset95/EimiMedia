import { TablerSearch } from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
	const [query, setQuery] = useState("");
	const [expanded, setExpanded] = useState(false);

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
		<nav className={`w-full flex flex-col md:flex-row ${expanded ? "gap-3" : "gap-0"} md:gap-6 justify-between items-center p-2 md:p-4 fixed top-0 right-0 z-40 theme-bg-secondary transition-all ${nav ? "" : "-translate-y-20"}`}>
			<div className="grow flex flex-row justify-between items-center w-full md:w-auto">
				<h1 className="text-xl md:text-2xl font-bold"> <a href="/"> EimiMedia </a> </h1>
				<ul className="grow md:grow-0 flex gap-2 md:gap-6 justify-center">
					<li><a className="hover:theme-highlight text-sm md:text-xl" href="">Songs</a></li>
					<li><a className="hover:theme-highlight text-sm md:text-xl" href="">Short Films</a></li>
					<li><a className="hover:theme-highlight text-sm md:text-xl" href="">Movies</a></li>
				</ul>
				<button className="md:hidden" onClick={() => setExpanded(!expanded)}>
					<FontAwesomeIcon className="w-6 h-6" icon={faBars} />
				</button>
			</div>
			<div className={`grow flex flex-row justify-between md:justify-end gap-6 items-center w-full md:w-auto md:h-full ${expanded ? "h-full" : "h-0 overflow-hidden" }`}>
				<form action={`/search/${query}`} className="grow md:grow-0 md:w-1/2 flex flex-row gap-2 items-center border border-1 rounded-md">
					<div className="p-2 md:p-4">
						<TablerSearch />
					</div>
					<input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent p-1 focus:outline-none" type="text" placeholder="Search"/>
				</form>
				<div>
					{username != "" ? <UserSignedIn uname={username} /> : <UserSignedOut />}
				</div>
			</div>
		</nav>
	)
}

