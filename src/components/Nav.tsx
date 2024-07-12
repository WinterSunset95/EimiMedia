// Name: Nav.tsx
// Type: Component
// Description: Navigation bar for the website
// Arguments: None
// Calls: None
// Last modified: 12/07/2024, 22:30
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
	const [nav, setNav] = useState(true);
	const { data: session, status } = useSession();
	const [query, setQuery] = useState("");
	const [expanded, setExpanded] = useState(false);

	let prevScrollTop = 0;
	let iterationCount = 0
	function windowScroll(e:any) {
		if (iterationCount < 10) {
			iterationCount++
			return
		}
		iterationCount = 0
		if (e.target.scrollTop > prevScrollTop) {
			setNav(false)
		} else {
			setNav(true)
		}
		console.log(e.target.scrollTop, prevScrollTop)
		prevScrollTop = e.target.scrollTop
	}

	useEffect(() => {
		document.addEventListener('scroll', (e) => {
			windowScroll(e)
		}, true)
	}, [])

	return (
		<nav className={`w-full flex flex-col md:flex-row ${expanded ? "gap-3" : "gap-0"} md:gap-6 justify-between items-center p-2 md:p-4 fixed top-0 right-0 z-40 bg-transparent backdrop-blur-md transition-all ${nav ? "" : "-translate-y-20"}`}>
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
						<FontAwesomeIcon icon={faSearch} />
					</div>
					<input value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent p-1 focus:outline-none" type="text" placeholder="Search"/>
				</form>
				<div>
					{status == "loading" ? 
						<button disabled>Loading . . .</button>
					: status == "authenticated" ?
					<button onClick={() => signOut()} className="theme-button">{session.user ? session.user.name ? session.user.name : session.user.email : "Unknown User"}</button>
					:
					<button onClick={() => signIn("cognito")} className="theme-button">Sign In</button>
					}
				</div>
			</div>
		</nav>
	)
}

