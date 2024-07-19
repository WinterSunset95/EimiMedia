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
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieCard(props: { data?: MovieResult[], carousel: boolean }) {

	if (!props.data) {
		return (
			<h1>Error in MovieCard: props undefined</h1>
		)
	}

	const Results = props.data.map((movie, index) => (
		<a href={`/movie/${movie.movieId}`} className={`group ${props.carousel ? "" : "w-full"} flex flex-col gap-2 snap-center md:snap-start snap-mandatory transition-all`} key={index}>
			<div className={`${props.carousel ? "w-[15rem]" : "w-full"} aspect-[2/3] overflow-hidden relative`}>
				<div className="absolute top-0 left-0 opacity-0 group-hover:opacity-75 transition-all duration-700 w-full h-full backdrop-blur-sm flex justify-center items-center z-50">
					<FontAwesomeIcon icon={faPlay} className="w-16 h-16 text-white" />
				</div>
				<img className="absolute top-0 left-0 group-hover:scale-105 transition-all w-full h-full object-cover z-40" src={movie.poster} alt={movie.title} />
			</div>
			<div className="flex flex-col gap-2 permanent-marker">
				<h1 className="">{movie.title}</h1>
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
