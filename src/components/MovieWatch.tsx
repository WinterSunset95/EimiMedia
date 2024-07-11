// Name: MovieWatch.tsx
// Type: Component
// Description: Displays the movie player
// Arguments:
// - movieDetails: MovieResult - The movie object
// - permissions: boolean - Whether the user has permission to watch the movie
// Calls: None
// Called by:
// - /movie/[movieId]/page.tsx
// Last modified: 12/07/2024, 01:14
import { useState } from "react";
import "./MovieWatch.css"
import { MovieResult } from "@/lib/interfaces";

export default function MovieWatch(props: {movieDetails: MovieResult, permissions: boolean}) {
	const [source, setSource] = useState<string>("vidsrcvip")

	const Paywall = () => {
		return (
			<div className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center theme-bg-secondary">
				<h1>You need to rent this movie to watch it</h1>
			</div>
		)
	}

	const Embeds = () => {
		if (!props.permissions) {
			return (
				<iframe title="Watch"
				src={`https://vidsrc.icu/embed/movie/hiadfevhsdfeihg`}
				referrerPolicy="origin"
				allowFullScreen
				width="1000"
				height="450"
				scrolling="no"
				/>
			)
		}

		if (props.movieDetails.streamingLink) {
			return (
				<video src={props.movieDetails.streamingLink} controls></video>
			)
		}

		if (source === "vidsrc") {
			return (
				<iframe title="Watch"
				src={`https://vidsrc.icu/embed/movie/${props.movieDetails.movieId}`}
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
				src={`https://vidsrc.vip/embed/movie/${props.movieDetails.movieId}`}
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
				src={`https://vidsrc.pro/embed/movie/${props.movieDetails.movieId}`}
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
				src={`https://vidsrc.in/embed/movie/${props.movieDetails.movieId}`}
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
				src={`https://multiembed.mov/?video_id=${props.movieDetails.movieId}&tmdb=1`}
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
			{!props.permissions && <Paywall />}
			<Embeds />
			{!props.movieDetails.streamingLink &&
			<select className="theme-button" value={source} onChange={(e) => setSource(e.target.value)} name="Sources" id="source">
				<option value="vidsrc">VidSrc</option>
				<option value="vidsrcvip">VidSrc VIP</option>
				<option value="vidsrcpro">VidPro</option>
				<option value="vidsrcin">VidSrc In</option>
				<option value="superembed">SuperEmbed</option>
			</select>
			}
		</div>
	)
}
