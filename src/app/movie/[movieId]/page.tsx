'use client'
import Nav from "@/components/Nav"
import MovieWatch from "@/components/MovieWatch"
import MovieDetails from "@/components/MovieDetails"
import Footer from "@/components/Footer"

export default function MoviePage({ params }: { params: {movieId: string}} ) {
	return (
		<main className="w-full h-full relative overflow-scroll">
			<Nav />

			<section className="mt-20 p-6 flex flex-col gap-12">
				<MovieWatch movieId={params.movieId} />
				<hr className="w-full" />
				<MovieDetails movieId={params.movieId} />
			</section>

			<Footer />
		</main>
	)
}
