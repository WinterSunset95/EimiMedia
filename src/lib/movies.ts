// Type: Service
// Description: This file contains the service for movies.

import type { MovieResult, MovieDetails, FeaturedMovie, Person, Error } from "./interfaces";
//import { secret } from "@aws-amplify/backend";

// Takes no arguments
export async function getFeaturedMovie(): Promise<FeaturedMovie<Person>> {
	// The following block is a placeholder code. It will be changed to our own implementation later.
	let data: FeaturedMovie<Person> = {
		id: "1",
		title: "John Wick",
		trailer: "https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/728fa59bff4866b9aba6290b60ed0a63/downloads/default.mp4",
		cast: [
			{
				name: "Keanu Reeves",
				role: "John Wick",
				image: "https://image.tmdb.org/t/p/w185/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg"
			},
			{
				name: "Ian McShane",
				role: "Winston",
				image: "https://image.tmdb.org/t/p/w185/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg"
			},
			{
				name: "Lance Reddick",
				role: "Charon",
				image: "https://image.tmdb.org/t/p/w185/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg"
			}
		],
		synopsis: "An ex-hitman comes out of retirement to track down the gangsters that took everything from him."
	}

	return data;
}

// Takes no arguments
// Returns a promise that resolves to a Movie<Person[]>
export async function getLatestMovies(): Promise<MovieResult[] | Error> {
	let error: Error = { message: "An error occurred." };
	
	let returnMovies: MovieResult[] = [];

	// Anything from this block is a placeholder. It will be changed to our own implementation later.
	try {
		let res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=efe0d01423f29d0dd19e4a7e482b217b");
		let data = await res.json();
		if (!data.results) {
			return error;
		}
		const tmdbResults = data.results;
		tmdbResults.forEach((movie:any) => {
			let movieData: MovieResult = {
				id: movie.id,
				title: movie.title,
				year: movie.release_date,
				poster: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
				length: "Unavailable",
				genres: ["Unavailable"],
			};
			returnMovies.push(movieData);
		});

		console.log(returnMovies);
	} catch (err) {
		return error;
	}
	// End of placeholder

	return returnMovies;
}

export async function getMovieDetails(movieId: string): Promise<MovieDetails | undefined> {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=efe0d01423f29d0dd19e4a7e482b217b`)
		const data = await res.json();
		if (!data) {
			return undefined;
		}
		let movieHours = Math.floor(data.runtime/60);
		let movieMinutes = data.runtime % 60;
		const movie: MovieDetails = {
			id: data.id,
			title: data.original_title,
			poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
			year: data.release_date,
			length: `${movieHours}h ${movieMinutes}m`,
			genres: ["Unavailable"],
			synopsis: data.overview,
			cast: [
				{
					name: "Person 1",
					role: "Character 1",
					image: `https://image.tmdb.org/t/p/w500${data.poster_path}`
				},
				{
					name: "Person 2",
					role: "Character 2",
					image: `https://image.tmdb.org/t/p/w500${data.poster_path}`
				},
				{
					name: "Person 3",
					role: "Character 3",
					image: `https://image.tmdb.org/t/p/w500${data.poster_path}`
				}
			],
			crew: [
				{
					name: "Person 1",
					role: "Character 1",
					image: `https://image.tmdb.org/t/p/w500${data.poster_path}`
				},
				{
					name: "Person 2",
					role: "Character 2",
					image: `https://image.tmdb.org/t/p/w500${data.poster_path}`
				},
				{
					name: "Person 3",
					role: "Character 3",
					image: `https://image.tmdb.org/t/p/w500${data.poster_path}`
				}
			],
			rating: data.vote_average,
			rentedBy: [
			],
		};
		return movie;
	} catch (err) {
		console.log(err);
		return undefined;
	}
}
