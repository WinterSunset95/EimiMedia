import { TablerSearch } from "./Search";
import { useEffect, useState } from "react";

const UserSignedIn = (props:{ uname: string }) => {

	return (
		<div className="theme-button">
			<a href="#">{props.uname}</a>
		</div>
	)
}

const UserSignedOut = () => {
	return (
		<div className="theme-button">
			<a href="/signin">Sign In</a>
		</div>
	)
}

export default function Nav() {
	const [username, setUsername] = useState("");
	const [nav, setNav] = useState(true);

	async function userStatus() {
		try {
			const user = false
			if (user) {
				setUsername("User")
			}
			console.log(user);
		} catch (err) {
			console.log(err);
		}
	}

	function windowScroll(e:Event) {
		console.log(document.body.scrollTop)
		console.log("Scroll event")
	}

	useEffect(() => {
		userStatus();
		window.addEventListener('scroll', (e) => {
			windowScroll(e)
		})
	}, [])

	return (
		<nav className={`w-full flex flex-row justify-between items-center p-6 fixed top-0 right-0 z-40 bg-transparent transition-all ${nav ? "" : "-translate-y-20"}`}>
			<h1 className="text-2xl font-bold">EimiMedia</h1>
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
				<input className="bg-transparent p-2 focus:outline-none" type="text" placeholder="Search"/>
			</div>
			<div>
				{username != "" ? <UserSignedIn uname={username} /> : <UserSignedOut />}
			</div>
		</nav>
	)
}

