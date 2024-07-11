// Name: CarouselList.tsx
// Type: Component
// Description: Renders a list of movies in a carousel
// Arguments:
// - data: MovieResult[] - An array of movie objects
// Calls: 
// - MovieCard.tsx
// Called by:
// - Latest.tsx
// Last modified: 12/07/2024, 01:12
import type { MovieResult } from "@/lib/interfaces";
import MovieCard from "./MovieCard";

export default function CarouselList(props: {data: MovieResult[]}) {
	return (
		<div className="flex flex-row flex-nowrap w-full overflow-x-scroll gap-4 py-4 snap-x snap-mandatory">
			<MovieCard data={props.data} carousel={true} />
		</div>
	)
}
