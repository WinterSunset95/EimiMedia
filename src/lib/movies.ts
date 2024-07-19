// Name: movies.ts
// Description: Server functions for handling movies data like fetching, searching, etc.
// Last modified: 12/7/2024, 00:52
'use server'

import type { MovieResult, FeaturedMovie, Person, Error } from "./interfaces";
import { docClient } from "./db";
import { AttributeValue, GetItemCommand, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

// Get the featured movie(s) from the database
// Called from:
// - components/Featured.tsx
export async function getFeaturedMovie(): Promise<FeaturedMovie<Person>> {
	// The following block is a placeholder code. It will be changed to our own implementation later.
	let data: FeaturedMovie<Person> = {
		id: "1",
		title: "John Wick",
		trailer: "https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/728fa59bff4866b9aba6290b60ed0a63/downloads/default.mp4",
		poster: "",
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

	const scanCommand = new ScanCommand({
		TableName: "EimiMediaFeatured",
	})

	const commandRes = await docClient.send(scanCommand)
	if (commandRes.$metadata.httpStatusCode != 200 || !commandRes.Items) {
		console.log("Error in getFeaturedMovie")
		return data;
	}

	const item = commandRes.Items[0]
	const itemCast = item.cast.SS!
	data = {
		id: item.movieId.S!,
		title: item.title.S!,
		trailer: item.trailer.S,
		poster: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/featured/${item.poster.S}.jpeg`,
		cast: itemCast.map((cast) => {
			return {
				name: cast,
				role: "",
				image: "https://image.tmdb.org/t/p/w185/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg"
			}
		}),
		synopsis: item.synopsis.S!
	}

	return data;
}

// Get the latest movies from dynamodb
// Called from: components/Latest.tsx
export async function getLatestMovies(): Promise<MovieResult[] | undefined> {
	console.log("getLatestMovies")
	let error: Error = { error: true, message: "An error occurred." };
	
	let returnMovies: MovieResult[] = [];

	// Lets make our own implementation too
	const command = new ScanCommand({
		TableName: "EimiListedMovies",
	})
	const commandRes = await docClient.send(command)
	if (!commandRes.Items) {
		error.error = true
		error.message = "command failed"
	}
	commandRes.Items?.map((item, index) => {
		const toAppend: MovieResult = {
			movieId: item.movieId.S!,
			title: item.title.S!,
			year: parseInt(item.year.N!),
			poster: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/image/${item.poster.S}.jpg`,
			length: item.length.S,
			genres: item.genres.SS,
			synopsis: item.synopsis.S,
			price: parseInt(item.price.N!),
			cast: item.cast?.SS
		}
		returnMovies.push(toAppend)
	})

	// Anything from this block is a placeholder. It will be changed to our own implementation later.
	try {
		let res = await fetch(`https://api.allorigins.win/get?url=https://api.themoviedb.org/3/trending/movie/day?api_key=efe0d01423f29d0dd19e4a7e482b217b`);
		let data = await res.json();
		const contents = JSON.parse(data.contents);
		if (!contents.results) {
			console.error("no results found")
		}
		const tmdbResults = contents.results;
		tmdbResults.forEach((movie:any) => {
			let movieData: MovieResult = {
				movieId: movie.id,
				title: movie.title,
				year: movie.release_date,
				poster: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
				length: "Unavailable",
				genres: ["Unavailable"],
				synopsis: movie.overview ? movie.overview : "Unavailable",
				price: 100,
				cast: []
			};
			returnMovies.push(movieData);
		});
	} catch (err) {
		console.log("An unknown error occured")
		//console.error("Unidentified error in getLatestMovies", err);
	}
	// End of placeholder

	return returnMovies;
}

// Takes ID of a movie as an argument
// Returns a promise that resolves to a MovieDetails
// Called from: components/MovieDetails.tsx
export async function getMovieDetails(movieId: string): Promise<MovieResult | undefined> {
	try {
		const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=efe0d01423f29d0dd19e4a7e482b217b`)
		const data = await res.json();
		if (!data) {
			throw new Error("Movie not found");
		}
		if (!data.id) {
			throw new Error("Movie not found");
		}
		let movieHours = Math.floor(data.runtime/60);
		let movieMinutes = data.runtime % 60;
		const movie: MovieResult = {
			movieId: data.id,
			title: data.original_title,
			poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
			year: data.release_date,
			length: `${movieHours}h ${movieMinutes}m`,
			genres: ["Unavailable"],
			synopsis: data.overview,
			cast: ["Person 1", "Person 2", "Person 3"],
			crew: ["Person 1", "Person 2", "Person 3"],
			rating: data.vote_average ? data.vote_average : 0,
			price: 100,
			reviewers: data.vote_count ? data.vote_count : 0
		};
		return movie;
	} catch (err) {
		console.log("An unknown error occured in getMovieDetails")
	}

	const command = new GetItemCommand({
		TableName: "EimiListedMovies",
		Key: {
			movieId: { S: movieId }
		}
	})

	const commandRes = await docClient.send(command)
	if (!commandRes.Item) {
		return undefined
	}

	const item = commandRes.Item
	const movie: MovieResult = {
		movieId: item.movieId.S!,
		title: item.title.S!,
		poster: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/image/${item.poster.S}.jpg`,
		year: item.year.N ? parseInt(item.year.N) : undefined,
		length: item.length.S,
		genres: item.genres.SS,
		synopsis: item.synopsis.S,
		cast: [ ],
		crew: [ ],
		rating: item.rating.S ,
		price: parseInt(item.price.N!)*100,
		reviewers: parseInt(item.reviewers.N!),
		streamingLink: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/movie/${item.movieId.S}.mp4`
	}

	return movie;
}

// Search for movies using the TMDB API
// Called from: search/[query]/page.tsx
export async function movieSearch(query: string): Promise<MovieResult[]> {
	const movies: MovieResult[] = [];
	try {
		const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=efe0d01423f29d0dd19e4a7e482b217b&query=${query}`)
		const data = await res.json();
		if (!data.results) {
			return [];
		}

		data.results.forEach((movie: any) => {
			let movieData: MovieResult = {
				movieId: movie.id,
				title: movie.original_title,
				year: movie.release_date,
				poster: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
				length: "Unavailable",
				genres: [],
				cast: [],
				crew: [],
				rating: movie.vote_average,
				synopsis: movie.overview,
				price: 100
			}
			movies.push(movieData);
		})
		return movies;

	} catch (err) {
		return [];
	}
}

// Get the permissions of a user for a movie
// Called from: movie/[movieId]/page.tsx
export async function getMoviePermissions(movieId: string, email: string): Promise<boolean> {
	// Get the user's data
	const command = new GetItemCommand({
		TableName: "EimiMediaUsers",
		Key: {
			email: { S: email }
		}
	})

	const commandRes = await docClient.send(command)

	// If status code is not 200, the data fetching failed
	if (commandRes.$metadata.httpStatusCode != 200) {
		console.log("Error in getMoviePermissions")
		return false;
	}

	// If no item is found, return false
	if (!commandRes.Item) {
		console.log("No item found in getMoviePermissions")
		return false;
	}

	const rentedMovies = commandRes.Item.rentedMovies.M
	// The user haven't rented any movies
	if (!rentedMovies) return false;
	console.log(rentedMovies)
	if (!rentedMovies[`${movieId}`]) return false;
	const rentedMovie = rentedMovies[`${movieId}`].N!
	const currentTime = new Date().getTime()
	const rentalTime = parseInt(rentedMovie)
	if (currentTime - rentalTime > 3600000) {
		return false;
	}
	console.log(new Date(currentTime), new Date(rentalTime))

	// So the user has rented the movie
	// Next we check if the rental period has expired, rental period is 1 hour

	return true;
}

// Delete a movie from the from the rented movies list of a user
// Called from: movies.ts
export async function deleteRentedMovie(email: string, movieId: string): Promise<boolean> {
	const query = new UpdateItemCommand({
		TableName: "EimiMediaUsers",
		Key: {
			email: { S: email }
		},
		UpdateExpression: "REMOVE rentedMovies.#movieId",
		ExpressionAttributeNames: {
			"#movieId": movieId
		}
	})

	const queryRes = await docClient.send(query)
	if (queryRes.$metadata.httpStatusCode != 200) {
		return false;
	}

	return true;
}
