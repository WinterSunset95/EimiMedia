// Name: ReviewForm.tsx
// Type: Component
// Description: Form to submit a review for a movie
// Arguments:
// - movieId: string
// Calls: None
// Called by:
// - MovieDetails.tsx
// Last modified: 12/07/2024, 01:09

import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';

export default function ReviewForm(props: {movieId: string}) {
	const [rating, setRating] = useState<number>(0)
	const [currentRating, setCurrentRating] = useState<number>(0)
	const ratingRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const stars = ratingRef.current?.querySelectorAll('button')
		stars?.forEach(star => {
			star.addEventListener('mouseover', () => {
				const temp = parseInt(star.getAttribute('data-index') || '0')
				setRating(temp)
			})
			star.addEventListener('mouseout', () => {
				setRating(currentRating)
			})
			star.addEventListener('click', () => {
				const newRating = parseInt(star.getAttribute('data-index') || '0')
				setCurrentRating(newRating)
				setRating(newRating)
			})
		})
	}, [ratingRef])

	return (
		<form className='flex flex-col gap-4'>
			<h1 className='font-bold text-xl'>Your rating</h1>
			<div ref={ratingRef} className='flex flex-row gap-2'>
				<button className='border-none' data-index="1">
					<FontAwesomeIcon icon={rating >= 1 ? faSolidStar : faStar} />
				</button>
				<button className='border-none' data-index="2">
					<FontAwesomeIcon icon={rating >= 2 ? faSolidStar : faStar} />
				</button>
				<button className='border-none' data-index="3">
					<FontAwesomeIcon icon={rating >= 3 ? faSolidStar : faStar} />
				</button>
				<button className='border-none' data-index="4">
					<FontAwesomeIcon icon={rating >= 4 ? faSolidStar : faStar} />
				</button>
				<button className='border-none' data-index="5">
					<FontAwesomeIcon icon={rating >= 5 ? faSolidStar : faStar} />
				</button>
			</div>
			<h1 className='font-bold text-xl'>Your review</h1>
			<textarea className='w-full h-32 theme-bg-secondary rounded-md' name="review" id="review"></textarea>
			<div className='flex flex-row gap-8'>
				<div className='flex flex-col grow gap-4'>
					<h2>Name*</h2>
					<input className='theme-bg-secondary border-none rounded-md p-2' type="text" name="name" id="name" placeholder='Enter your name'/>
				</div>
				<div className='flex flex-col grow gap-4'>
					<h2>Email*</h2>
					<input className='theme-bg-secondary border-none rounded-md p-2' type="email" name="email" id="email" placeholder='Enter Email'/>
				</div>
			</div>
			<input type="submit" value="Submit" className='theme-button w-min' />
		</form>
	)
}
