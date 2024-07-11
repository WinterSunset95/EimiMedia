// Name: Progress
// Type: Component
// Description: Displays a fullscreen progress page
// Arguments:
// - progress: number - The progress percentage
// Calls: None
// Called by:
// - AdminMovie.tsx
// Last modified: 12/07/2024, 01:15

export default function Progress(props: { progress: number }) {
	return (
		<div className="fixed top-0 left-0 w-full h-full theme-bg-blur flex justify-center items-center z-50">
			<div className="w-full h-full max-w-[500px] max-h-[500px] flex justify-center items-center rounded-lg backdrop-blur-lg">
				Progress: {Math.floor(props.progress)}%
			</div>
		</div>
	)
}
