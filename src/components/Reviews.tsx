// Type: Component
// Description: Displays reviews for a movie
// Arguments: 1. movieId: string
// Called in: MovieDetails.tsx
// Calls: None

export default function Reviews(props: {movieId: string}) {
	return (
		<div className="py-8">
			<h1 className="font-bold text-2xl">No reviews yet</h1>
		</div>
	)
}
