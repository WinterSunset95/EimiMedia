import type { MovieResult, Error } from "../lib/interfaces"
import { useState, useEffect } from "react"
import { getLatestMovies } from "../lib/movies"
import styles from './Latest.module.css'

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
		<div className="flex flex-col gap-2 snap-start snap-mandatory" key={index}>
			<div className={styles.imageContainer}>
				<img src={movie.poster} alt={movie.title} />
			</div>
			<div className={styles.content}>
				<h1>{movie.title}</h1>
			</div>
		</div>
	))

	return (
		<main className="flex flex-col p-6 w-full">
			<h1>Latest Movies</h1>
			<div className="flex flex-row flex-nowrap w-full overflow-x-scroll gap-4 snap-x snap-mandatory">
				{Results}
			</div>
		</main>
	)
}
