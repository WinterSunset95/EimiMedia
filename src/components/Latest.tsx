import type { MovieResult, Error } from "../lib/interfaces"
import { useState, useEffect } from "react"
import { getLatestMovies } from "../lib/movies"
import CarouselList from "./CarouselList"

export default function Latest() {
	const [latest, setLatest] = useState<MovieResult[]>()
	const [error, setError] = useState<Error>()

	async function initialLoad() {
		const data = await getLatestMovies()
		if (data instanceof Error) {
			setError(data)
		} else if (data instanceof Array) {
			setLatest(data)
		}
	}

	useEffect(() => {
		initialLoad()
	},[])

	useEffect(() => {
		console.log(latest)
	}, [latest])

	// In case of error
	if (error) {
		return (
			<main>
				<h1>{error.message}</h1>
			</main>
		)
	}

	// While the page is loading
	if (!latest) {
		return (
			<main>
				<h1>Loading</h1>
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
