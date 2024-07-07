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

export type MovieResult = {
	id: string;
	title: string;
	poster: string;
	price: number;
	year?: number;
	length?: string;
	synopsis?: string;
	genres?: string[];
	cast?: Person[];
	crew?: Person[];
	rating?: string;
	reviewers?: number;
}

export interface User {
	eimimedia: string;
	name: string;
	given_name: string;
	email: string;
	image: string;
	groups: string[];
	rentedMovies: string[];
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

