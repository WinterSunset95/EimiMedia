
export default function Progress(props: { progress: number }) {
	return (
		<div className="fixed top-0 left-0 w-full h-full theme-bg-blur flex justify-center items-center z-50">
			<div className="w-full h-full max-w-[500px] max-h-[500px] flex justify-center items-center rounded-lg backdrop-blur-lg">
				Progress: {Math.floor(props.progress)}%
			</div>
		</div>
	)
}
