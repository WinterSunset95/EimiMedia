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
	movieId: string;
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
	userId: string;
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
