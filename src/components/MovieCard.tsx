// Name: MovieCard.tsx
// Type: Component
// Description: Renders a list of movies that can be used in a carousel or a grid
// Arguments:
// - data: MovieResult[] - An array of movie objects
// - carousel: boolean - A boolean value to determine if the list is a carousel or a grid
// Calls: None
// Called by:
// - CarouselList.tsx
// - GridList.tsx
// Last modified: 12/07/2024, 01:00
import type { MovieResult } from "@/lib/interfaces";

export default function MovieCard(props: { data?: MovieResult[], carousel: boolean }) {

	if (!props.data) {
		return (
			<h1>Error in MovieCard: props undefined</h1>
		)
	}

	const Results = props.data.map((movie, index) => (
		<a href={`/movie/${movie.movieId}`} className={`${props.carousel ? "" : "w-full"} flex flex-col gap-2 snap-center md:snap-start snap-mandatory transition-all hover:scale-105`} key={index}>
			<div className={`${props.carousel ? "w-[15rem]" : "w-full"} aspect-[2/3] overflow-hidden rounded-md`}>
				<img className="w-full h-full object-cover" src={movie.poster} alt={movie.title} />
			</div>
			<div className="flex flex-col">
				<h1 className="my-2">{movie.title}</h1>
				<p><span className="theme-highlight">Released: </span>{movie.year}</p>
			</div>
		</a>
	))

	return (
		<>
			{Results}
		</>
	)
}
