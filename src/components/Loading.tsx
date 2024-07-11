// Name: Loading.tsx
// Type: Component
// Description: Displays a fullscreen loading page
// Arguments: None
// Calls: None
// Called by:
// - MovieDetails.tsx
// Last modified: 12/07/2024, 00:57

export default function Loading() {
	return (
		<div className="fixed top-0 left-0 w-full h-full theme-bg-blur z-50 flex justify-center items-center">
			<div className="p-20 flex justify-center items-center backdrop-blur-lg rounded-lg ">
				Loading . . .
			</div>
		</div>
	)
}
