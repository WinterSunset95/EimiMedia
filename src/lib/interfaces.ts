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

export interface Error {
	message: string;
}
