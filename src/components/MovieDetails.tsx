// Name: MovieDetails.tsx
// Type: Component
// Description: Displays details for a movie
// Arguments:
// - movieDetails: MovieResult - The movie object to display
// - permissions: boolean - A boolean value to determine if the user has permissions to watch the movie
// Calls:
// - showRazorPay
// - Latest.tsx
// - ReviewForm.tsx
// - Reviews.tsx
// - Loading.tsx
// Called by:
// - /movie/[movieId]/page.tsx
// Last modified: 12/07/2024, 01:07

import type { MovieResult, RazorPayOrderError, RazorPayOrderResponse, RazorPayOrder, RazorPayVerifyResponse } from "@/lib/interfaces"
import { showRazorPay } from "@/lib/razorpay"
import { useSession, signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faStar, faMessage, faThumbsUp, faPlusSquare } from "@fortawesome/free-regular-svg-icons"
import Latest from "./Latest"
import ReviewForm from "./ReviewForm"
import Reviews from "./Reviews"
import Loading from "./Loading"
import { Orders } from "razorpay/dist/types/orders"
import { INormalizeError } from "razorpay/dist/types/api"

export default function MovieDetails(props: {movieDetails: MovieResult | undefined, permissions: boolean}) {
	const [loading, setLoading] = useState<boolean>(false)
	const { data: session, status } = useSession()

	if (!props.movieDetails) {
		return (
			<section className="w-full p-32 flex justify-center items-center">
				<h1>Loading . . . </h1>
			</section>
		)
	}

	async function buyMovie() {
		setLoading(true)
		if (status != "authenticated") {
			console.error("User not authenticated")
			return
		}
		if (!props.movieDetails) {
			console.error("Movie details not loaded")
			return
		}
		const razorOrder: RazorPayOrder = {
			amount: props.movieDetails.price,
			currency: "INR",
			orderType: "movie",
			orderId: props.movieDetails.movieId,
		}

		const response = await fetch("/api/order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(razorOrder)
		})

		const data: Orders.RazorpayOrder | INormalizeError = await response.json()
		if ("error" in data) {
			console.error(data.error)
			return
		}

		console.log(data)

		// Redirect to payment gateway
		const razorPayCheckout = await showRazorPay(data, `/api/addmovie?userEmail=${session!.user!.email}&movieId=${props.movieDetails.movieId}&redirectUrl=${window.location.href}`)
		console.log(razorPayCheckout)
		setLoading(false)
	}

	return (
		<section className="flex flex-col md:flex-row gap-8">
			{loading && <Loading />}

			<div className="flex flex-col gap-4 w-full md:w-3/12">
				<div className="w-full aspect-[9/16] overflow-hidden rounded-md">
					<img className="w-full h-full object-cover" src={props.movieDetails.poster} alt={props.movieDetails.title} />
				</div>
				<div className="flex flex-row w-full gap-4">
					<button className="theme-button w-1/3" >{props.movieDetails.rating}</button>
					<button className="theme-button w-1/3" >Share</button>
					<button className="theme-button w-1/3" >Watchlist</button>
				</div>
				{status == "unauthenticated" ? 
				<button className="theme-button w-full" onClick={() => signIn()}>SignIn to watch</button>
				: status == "loading" ?
				<button className="theme-button w-full">Loading . . .</button>
				: props.permissions ? 
				<button className="theme-button w-full">You rented this movie</button>
				:
				<button className="theme-button w-full" onClick={() => buyMovie()}>Rent for Rs. {props.movieDetails.price/100}</button>
				}
			</div>

			<div className="w-full md:h-[50rem] md:w-9/12 overflow-auto scroll-smooth hide-scrollbar">

				<div className="flex flex-col gap-4 h-min">

					<h1 className="font-bold text-4xl">{props.movieDetails.title}</h1>

					<div className="flex flex-row gap-4">
						<div className="flex flex-row gap-2 items-center">
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
						</div>
						<span>{props.movieDetails.rating}</span>
						<div className="flex flex-row gap-2 items-center">
							<FontAwesomeIcon icon={faEye} />
							<span>Unavailable</span>
						</div>
						<div className="flex flex-row gap-2 items-center">
							<FontAwesomeIcon icon={faMessage} />
							<span>{props.movieDetails.reviewers ? props.movieDetails.reviewers : 0} Reviews</span>
						</div>
					</div>

					<div className="flex flex-row gap-4 items-center">
						<span>{props.movieDetails.year}</span>
						<div className="w-[2px] h-[2px] rounded-full border border-1"></div>
						<span>{props.movieDetails.length}</span>
					</div>

					<div className="">
						{props.movieDetails.synopsis}. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi veritatis cum praesentium voluptate odit fugit omnis iure, alias hic doloribus quis, eveniet iste id voluptatibus ipsa eum numquam modi itaque.
					</div>

					<h2 className="font-bold text-2xl">Cast</h2>
					<div className="flex flex-row gap-4 items-center">
						{props.movieDetails.cast?.map((actor, index) => (
							<div key={index} className="flex flex-col items-center">
								<div className="w-24 aspect-square rounded-full overflow-hidden">
									<img className="w-full h-full object-cover" src={actor.image} alt={actor.name} />
								</div>
								<span>{actor.name}</span>
							</div>
						))}
					</div>

					<h2 className="font-bold text-2xl">Crew</h2>
					<div className="flex flex-row gap-4 items-center">
						{props.movieDetails.crew?.map((member, index) => (
							<div key={index} className="flex flex-col items-center">
								<div className="w-24 aspect-square rounded-full overflow-hidden">
									<img className="w-full h-full object-cover" src={member.image} alt={member.name} />
								</div>
								<span>{member.name}</span>
							</div>
						))}
					</div>

					<hr className="w-full my-12" />

					<h2 className="font-bold text-2xl">Recommended for you</h2>
					<Latest />
					<ReviewForm movieId={props.movieDetails.movieId} />
					<Reviews movieId={props.movieDetails.movieId} />

				</div>
			</div>
		</section>
	)
}
