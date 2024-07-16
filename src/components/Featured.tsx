// Name: Featured.tsx
// Type: Component
// Description: Displays the featured movie(s) as a carousel on the screen
// Arguments: None
// Calls:
// - getFeaturedMovie() from movies.ts
// Called by:
// - /page.tsx
// Last modified: 12/07/2024, 00:58
import type { FeaturedMovie, Person, Error } from "../lib/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { getFeaturedMovie } from "../lib/movies"

import { useEffect, useState } from "react"

export default function Featured() {
	const [featured, setFeatured] = useState<FeaturedMovie<Person>>()

	async function initialLoad() {
		const data = await getFeaturedMovie()
		setFeatured(data)
		console.log(data)
	}

	useEffect(() => {
		initialLoad()
	}, [])

	if (!featured) {
		return (
			<main className="w-full h-5/6 flex justify-center items-center z-30 backdrop-blur-lg">
				<h1>Loading</h1>
			</main>
		)
	}

	return (
		<main className="w-full h-5/6 flex flex-col justify-center relative z-30">
			<div className="flex flex-col justify-center gap-4 w-full h-full p-6 md:p-12 home-gradient">
				<h1 className="text-4xl font-bold">{featured.title}</h1>
				<p>{featured.synopsis}</p>
				<div className="flex flex-row flex-wrap gap-2">
					<span className="theme-highlight">Cast: </span>
					{featured.cast.map((person, index) => (
						<p key={index}>{person.name} as {person.role}, </p>
					))}
				</div>
				<div className="flex flex-row">
					<a href="/movie/603692" className="theme-button flex flex-row justify-center items-center gap-2">
						<span>Play Now</span>
						<FontAwesomeIcon icon={faPlay} />
					</a>
				</div>
			</div>
			<div className="absolute -z-20 w-full h-full top-0 left-0 flex justify-center items-center overflow-hidden">
				<video className="min-h-[150%] min-w-[150%] object-cover" src={featured.trailer} autoPlay muted></video>
			</div>
		</main>
	)
}
