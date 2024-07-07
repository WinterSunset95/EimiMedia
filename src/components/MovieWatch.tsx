import { useState } from "react";
import "./MovieWatch.css"

// This page is temporary. It only gets embeds from the movieId and displays it.
// The final version will have a player and get its own data from the API.
export default function MovieWatch(props: {movieId: string, permissions: boolean}) {
	const [source, setSource] = useState<string>("vidsrc")

	const Paywall = () => {
		return (
			<div className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center theme-bg-secondary">
				<h1>You need to rent this movie to watch it</h1>
			</div>
		)
	}

	const Embeds = () => {
		// Uncomment later
		//if (!props.permissions) {
		//	return (
		//		<iframe title="Watch"
		//		src={`https://vidsrc.icu/embed/movie/hiadfevhsdfeihg`}
		//		referrerPolicy="origin"
		//		allowFullScreen
		//		width="1000"
		//		height="450"
		//		scrolling="no"
		//		/>
		//	)
		//}

		if (source === "vidsrc") {
			return (
				<iframe title="Watch"
				src={`https://vidsrc.icu/embed/movie/${props.movieId}`}
				referrerPolicy="origin"
				allowFullScreen
				width="1000"
				height="450"
				scrolling="no"
				/>
			)
		} else if (source === "vidsrcvip") {
			return (
				<iframe title="Watch"
				src={`https://vidsrc.vip/embed/movie/${props.movieId}`}
				referrerPolicy="origin"
				allowFullScreen
				width="1000"
				height="450"
				scrolling="no"
				/>
			)
		} else if (source === "vidsrcpro") {
			return (
				<iframe title="Watch"
				src={`https://vidsrc.pro/embed/movie/${props.movieId}`}
				referrerPolicy="origin"
				allowFullScreen
				width="1000"
				height="450"
				scrolling="no"
				/>
			)
		} else if (source === "vidsrcin") {
			return (
				<iframe title="Watch"
				src={`https://vidsrc.in/embed/movie/${props.movieId}`}
				referrerPolicy="origin"
				allowFullScreen
				width="1000"
				height="450"
				scrolling="no"
				/>
			)
		} else if (source === "superembed") {
			return (
				<iframe title="Watch"
				src={`https://multiembed.mov/?video_id=${props.movieId}&tmdb=1`}
				referrerPolicy="origin"
				allowFullScreen
				width="1000"
				height="450"
				scrolling="no"
				/>
			)
		}
	}

	return (
		<div className="w-full h-full flex flex-col items-center gap-4 relative">
			{/* !props.permissions && <Paywall /> */}
			<Embeds />
			<select className="theme-button" value={source} onChange={(e) => setSource(e.target.value)} name="Sources" id="source">
				<option value="vidsrc">VidSrc</option>
				<option value="vidsrcvip">VidSrc VIP</option>
				<option value="vidsrcpro">VidPro</option>
				<option value="vidsrcin">VidSrc In</option>
				<option value="superembed">SuperEmbed</option>
			</select>
		</div>
	)
}
