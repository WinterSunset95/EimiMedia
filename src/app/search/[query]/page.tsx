'use client'
import type { MovieResult } from "@/lib/interfaces"
import type { Metadata } from "next"
import Head from "next/head"
import { useState, useEffect } from "react"
import GridList from "@/components/GridList"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { movieSearch } from "@/lib/movies"

export default function Search({ params }: { params: {query: string} }) {
	const [movies, setMovies] = useState<MovieResult[]>()

	async function fetchMovies() {
		const res = await movieSearch(params.query)
		if (res.length === 0) {
			alert("No movies found")
		}
		setMovies(res)
	}

	useEffect(() => {
		fetchMovies()
	},[params.query])

	if (!movies) {
		return (
			<div className="w-full h-full flex justify-center items-center">
				<h1 className="font-bold text-4xl">Loading . . .</h1>
			</div>
		)
	}

	return (
		<>
		<Head>
			<title>Search</title>
		</Head>
		<main className="w-full h-full relative overflow-scroll">
			<Nav />
			<h1 className="font-bold text-4xl mt-24 p-6">Welcome to the search page</h1>
			<GridList data={movies} />
			<Footer />
		</main>
		</>
	)
}
