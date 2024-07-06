import type { MovieResult, Error } from "../lib/interfaces"
import { useState, useEffect } from "react"
import { getLatestMovies } from "../lib/movies"

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

	// We get results
	const Results = latest.map((movie, index) => (
		<a href={`/movie/${movie.id}`} className="flex flex-col gap-2 snap-start snap-mandatory transition-all hover:scale-105" key={index}>
			<div className="w-[15rem] aspect-[2/3] overflow-hidden rounded-md">
				<img className="w-full h-full object-cover" src={movie.poster} alt={movie.title} />
			</div>
			<div className="flex flex-col">
				<h1 className="my-2">{movie.title}</h1>
				<p><span className="theme-highlight">Released: </span>{movie.year}</p>
			</div>
		</a>
	))

	return (
		<div className="flex flex-row flex-nowrap w-full overflow-x-scroll gap-4 py-4 snap-x snap-mandatory">
			{Results}
		</div>
	)
}
