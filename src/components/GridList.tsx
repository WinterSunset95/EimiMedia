// Name: GridList.tsx
// Type: Component
// Description: Displays a grid of movie cards
// Arguments:
// - data: MovieResult[] - An array of movie objects
// Calls:
// - MovieCard.tsx
// Called by:
// - /search/[query]/page.tsx
// Last modified: 12/07/2024, 01:13
import type { MovieResult } from "@/lib/interfaces";
import MovieCard from "./MovieCard";

export default function GridList(props: { data: MovieResult[] }) {
	return (
		<div className="w-full p-6 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
			<MovieCard data={props.data} carousel={false} />
		</div>
	)
}
