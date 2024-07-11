// Name: Latest.tsx
// Type: Component
// Description: Displays a list of the latest movies in a carousel
// Calls:
// - getLatestMovies() from movies.ts
// - CarouselList.tsx
// Called by:
// - MovieDetails.tsx
// - /page.tsx
// Last modified: 12/07/2023, 00:57
import type { MovieResult } from "../lib/interfaces"
import { useState, useEffect } from "react"
import { getLatestMovies } from "../lib/movies"
import CarouselList from "./CarouselList"

export default function Latest() {
	const [latest, setLatest] = useState<MovieResult[] | undefined>()

	async function initialLoad() {
		const data = await getLatestMovies()
		setLatest(data)
	}

	useEffect(() => {
		initialLoad()
	},[])

	useEffect(() => {
		console.log(latest)
	}, [latest])

	// While the page is loading
	if (!latest) {
		return (
			<main>
				<h1>Loading . . .</h1>
			</main>
		)
	}

	return (
		<div className="p-6">
			<h1 className="my-4 font-bold text-4xl">Latest Movies</h1>
			<CarouselList data={latest} />
		</div>
	)
}
