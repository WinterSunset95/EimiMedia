// Code: Admin Movie Page
// Description: Form to upload movie to s3 bucket and store movie details in dynamoDB
// Called by: /admin/Admin.tsx

'use client'
import type { Person } from '@/lib/interfaces'
import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import { movieUpload } from '@/lib/admin'
import './AdminForm.css'

export default function AdminMovie() {
	const [currentgenre, setCurrentGenre] = useState<string>('')
	const [genres, setGenres] = useState<string[]>([])

	// For cast and crew
	const [cast, setCast] = useState<Person[]>([])
	const [uname, setUname] = useState<string>('')
	const [uimage, setUimage] = useState<string>('')
	const [urole, setUrole] = useState<string>('')

	function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) throw new Error('No files selected')
		const file = e.target.files[0]
		setUimage(URL.createObjectURL(file))
		console.log(file)
	}

	function uploadCast(e: FormEvent<HTMLFormElement>) {
		console.log('uploading cast')
		e.preventDefault()
		if (!uimage) throw new Error('No image selected')
		setCast([...cast, { name: uname, image: uimage, role: urole }])
		setUname('')
		setUimage('')
		setUrole('')
		console.log(cast)
	}

	return (
		<div className='w-full max-w-[1000px] flex flex-col gap-2'>

			<form className='w-full flex flex-col gap-2'>
				<label htmlFor="id">Movie ID</label>
				<input type="text" id="id" name="id" required />
				<label htmlFor="title">Title</label>
				<input type="text" id="title" name="title" required />
				<label htmlFor="poster">Upload Thumbnail/Poster for movie</label>
				<input type="file" id="poster" name="poster" required />
				<label htmlFor="price">Price</label>
				<input type="number" id="price" name="price" required />
				<label htmlFor="year">Release Date</label>
				<input type="date" id="year" name="year" required />
				<span>Movie Runtime</span>
				<label htmlFor="hours">Hours</label>
				<input type="number" id="hours" name="hours" required />
				<label htmlFor="minutes">Minutes</label>
				<input type="number" id="minutes" name="minutes" required />
				<label htmlFor="synopsis">Synopsis</label>
				<textarea id="synopsis" name="synopsis" required />
				<label htmlFor="genres">Genres of movie</label>
				<div className='flex flex-wrap gap-2'>
				{genres.map((genre, index) => (
					<button className='theme-button' key={index} onClick={() => {
						genres.splice(index, 1)
						setGenres([...genres])
					}}>{genre}</button>
				))}
				</div>
				<div className='flex flex-wrap gap-2'>
					<input type="text" id="genre" name="genre" value={currentgenre} onChange={(e) => setCurrentGenre(e.target.value)} />
					<button className='theme-button' onClick={() => {
						setGenres([...genres, currentgenre])
					}}>Add</button>
				</div>
			</form>

			<label htmlFor="cast">Cast of movie</label>
			<div className='flex flex-wrap gap-2'>
			{cast.map((person, index) => (
				<div key={index} className='flex flex-col gap-2'>
					<div className='w-10 h-10 rounded-full overflow-hidden'>
						<img className='w-full h-full object-cover' src={person.image} alt="" />
					</div>
					<div>{person.name} as </div>
					<div>{person.role}</div>
				</div>
			))}
			</div>
			<form className='flex flex-col gap-2' onSubmit={uploadCast}>
				<label htmlFor="name">Name</label>
				<input type="text" id='name' value={uname} onChange={(e) => setUname(e.target.value)} required/>
				<label htmlFor="image">Picture of cast member</label>
				<input type="file" id='image' onChange={handleImageUpload} required/>
				<label htmlFor="role">Role</label>
				<input type="text" id='role' value={urole} onChange={(e) => setUrole(e.target.value)} required/>
				<input type="submit" value="Submit" />
			</form>

			<footer className='p-10'></footer>
		</div>
	)
}
