import { type } from "os";

export interface Person {
	name: string;
	role: string;
	image: string;
}

export interface FeaturedMovie<T> {
	id: string;
	title: string;
	trailer: string;
	cast: T[];
	synopsis: string;
}

export interface MovieResult {
	id: string;
	title: string;
	year: number;
	poster: string;
	length: string;
	genres: string[];
}

export interface User {
	id: string;
	name: string;
	poster: string;
	email: string;
	rentedMovies: MovieDetails[];
	groups: string[];
}

export interface MovieDetails {
	id: string;
	title: string;
	poster: string;
	year: string;
	length: string;
	genres: string[];
	synopsis: string;
	cast: Person[];
	crew: Person[];
	rating: string;
	rentedBy: User[];
}

export interface Error {
	message: string;
}

export type UserPost = {
	name: string;
	email: string;
	image: string;
	eimimedia: string;
}

