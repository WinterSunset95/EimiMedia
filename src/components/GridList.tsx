import type { MovieResult } from "@/lib/interfaces";
import MovieCard from "./MovieCard";

export default function GridList(props: { data?: MovieResult[] }) {
	
	if (!props.data) {
		return (
			<h1>Error in GridList: props.data undefined</h1>
		)
	}

	return (
		<div className="w-full p-6 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
			<MovieCard data={props.data} carousel={false} />
		</div>
	)
}
