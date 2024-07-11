'use client'
import Nav from "@/components/Nav"
import MovieWatch from "@/components/MovieWatch"
import MovieDetails from "@/components/MovieDetails"
import Footer from "@/components/Footer"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { MovieResult } from "@/lib/interfaces"
import { getMovieDetails } from "@/lib/movies"

export default function MoviePage({ params }: { params: {movieId: string}} ) {
	const [permitted, setPermitted] = useState<boolean>(false)
	const [details, setDetails] = useState<MovieResult>()
	const { data: session, status } = useSession()

	async function checkPermissions() {
		if (status != "authenticated") {
			setPermitted(false)
			return
		}

		const userEmail = session?.user?.email!
		const res = await fetch(`/api/moviepermission`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: userEmail,
				movieId: params.movieId
			})
		})

		try {
			const data = await res.json() as {permission: string}
			if (data.permission === "granted") {
				setPermitted(true)
			} else {
				setPermitted(false)
			}
			console.log(data)
		} catch (error) {
			console.error(error)
			setPermitted(false)
		}
	}

	async function initialLoad() {
		const data = await getMovieDetails(params.movieId)
		if (!data) {
			console.error("Error fetching movie details")
			return
		}
		console.log(data)
		setDetails(data)
	}

	useEffect(() => {
		initialLoad()
	}, [])

	useEffect(() => {
		checkPermissions()
	}, [status])

	return (
		<main className="w-full h-full relative overflow-scroll">
			<Nav />

			<section className="mt-20 p-6 flex flex-col gap-12">
				{details && <MovieWatch movieDetails={details} permissions={permitted} /> }
				<hr className="w-full" />
				<MovieDetails movieDetails={details} permissions={permitted} />
			</section>

			<Footer />
		</main>
	)
}
