import type { MovieResult } from "@/lib/interfaces";
import MovieCard from "./MovieCard";

export default function CarouselList(props: {data?: MovieResult[]}) {
	if (!props.data) {
		return (
			<h1>Error in CarouselList: props.data undefined</h1>
		)
	}

	return (
		<div className="flex flex-row flex-nowrap w-full overflow-x-scroll gap-4 py-4 snap-x snap-mandatory">
			<MovieCard data={props.data} carousel={true} />
		</div>
	)
}
