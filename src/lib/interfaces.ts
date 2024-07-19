// Name: interfaces.ts
// Description: Define the interfaces and types used in the project. Type safety is important.
// Last modified: 12/7/2024, 00:45

export interface Person {
	name: string;
	role: string;
	image: string;
}

export interface FeaturedMovie<T> {
	id: string;
	title: string;
	trailer?: string;
	poster?: string;
	cast: T[];
	synopsis: string;
}

export type MovieResult = {
	movieId: string;
	title: string;
	poster: string;
	price: number;
	year?: number;
	length?: string;
	synopsis?: string;
	genres?: string[];
	cast?: string[];
	crew?: string[];
	rating?: string;
	reviewers?: number;
	streamingLink?: string;
}

export type Song = {
	songId: string;
	title: string;
	artist: string;
	album: string;
	year: number;
	duration: string;
	genres: string[];
	cover: string;
	likes: number;
	dislikes: number;
}

export interface User {
	userId: string;
	name: string;
	given_name: string;
	email: string;
	image: string;
	groups: string[];
	rentedMovies: string[];
	likes?: string[];
	dislikes?: string[];
}

export interface Error {
	error: boolean;
	message: string;
}

export type UserPost = {
	name: string;
	email: string;
	image: string;
	eimimedia: string;
}

export type RazorPayOrderResponse = {
  id: string,
  entity?: string,
  amount?: number,
  amount_paid?: number,
  amount_due?: number,
  currency: string,
  receipt?: string,
  status?: string,
  attempts?: number,
  notes?: any[],
  created_at?: number
}

export type RazorPayVerifyResponse = {
	razorpay_order_id: string,
	razorpay_payment_id: string,
	razorpay_signature: string
}

export type RazorPayOrderError = {
	error: {
		code: string,
		description: string,
		source: string,
		step: string,
		reason: string,
		metadata: {},
		field: string
	}
}

export type RazorPayOrder = {
	amount: number,
	currency: string,
	orderType: string,
	orderId: string,
}
