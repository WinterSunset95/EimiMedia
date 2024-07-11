// Name: AdminMovie.tsx
// Type: Component
// Description: Form to upload movie to s3 bucket and store movie details in dynamoDB
// Arguments: None
// Calls:
// - addMovieToDatabase - Function to add movie to database				|
// - getImageUploadUrl - Function to get signed url for image upload	| admin.ts
// - getMovieUploadUrl - Function to get signed url for movie upload	|
// - Progress.tsx
// Called by: /admin/page.tsx
// Last modified: 12/07/2024, 01:18

'use client'
import type { MovieResult, Person } from '@/lib/interfaces'
import { useState, useEffect, useRef, ChangeEvent, FormEvent, MutableRefObject } from 'react'
import { addMovieToDatabase, getImageUploadUrl, getMovieUploadUrl } from '@/lib/admin'
import Progress from './Progress'
import './AdminForm.css'

export default function AdminMovie() {
	const [title, setTitle] = useState<string>('')
	const [poster, setPoster] = useState<Blob>()
	const [price, setPrice] = useState<string>('')
	const [year, setYear] = useState<string>('')
	const [hours, setHours] = useState<string>('')
	const [minutes, setMinutes] = useState<string>('')
	const [synopsis, setSynopsis] = useState<string>('')
	const [movieFile, setMovieFile] = useState<File>()
	const movieFileRef = useRef<HTMLInputElement>(null)

	const [uploading, setUploading] = useState<boolean>(false)
	const [uploadProgress, setUploadProgress] = useState<number>(0)

	const [currentgenre, setCurrentGenre] = useState<string>('')
	const [genres, setGenres] = useState<string[]>([])

	// For cast and crew
	const [cast, setCast] = useState<{
		name: string,
		image: Blob,
		role: string
	}[]>([])
	const [uname, setUname] = useState<string>('')
	const [uimage, setUimage] = useState<Blob>()
	const [urole, setUrole] = useState<string>('')

	function previewCast(e: FormEvent<HTMLFormElement>) {
		console.log('uploading cast')
		e.preventDefault()
		if (!uimage) throw new Error('No image selected')
		setCast([...cast, { name: uname, image: uimage, role: urole }])
		setUname('')
		setUrole('')
	}

	function addGenre(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setGenres([...genres, currentgenre])
	}

	async function upLoadImage(url: string, imageBlob: Blob, name: string) {
		if (!url) throw new Error('Failed to get signed url for image upload')
		const imageLength = imageBlob?.size
		const imageUploadRes = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Length": `${imageLength}`,
			},
			body: poster
		})
		if (!imageUploadRes.ok) {
			console.log('Failed to upload image')
			return {
				error: true,
			}
		}
		console.log('Image uploaded')
		return {
			error: false,
		}
	}

	async function submitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const randomId = Math.random().toString(36).substring(7)
		const randomImageName = Math.random().toString(36).substring(7)
		const signedImageUpload = await getImageUploadUrl(randomImageName);

		const movie: MovieResult = {
			movieId: randomId,
			title: title,
			poster: randomImageName,
			price: parseFloat(price),
			year: parseInt(year),
			length: `${hours}h ${minutes}m`,
			synopsis: synopsis,
			genres: genres,
			cast: [],
			crew: [],
			rating: "",
			reviewers: 0
		}

		// The following block works, don't fucking touch
		const movieDbAddResponse = await addMovieToDatabase(movie)
		if (!movieDbAddResponse) throw new Error('Failed to add movie to database')
		console.log('Movie added to database')

		// First lets upload the poster image
		if (poster) {
			const posterImageUploadRes = await upLoadImage(signedImageUpload, poster, randomImageName)
			if (posterImageUploadRes.error) console.log("Error uploading image")
		} else {
			console.log("Poster image not available")
		}

		// Next lets upload every image in 'cast'
		cast.forEach(async (person) => {
			const randomImageIdForCastMember = Math.random().toString(36).substring(7)
			const castMemberImageUploadRes = await upLoadImage(signedImageUpload, person.image, randomImageIdForCastMember)
			if (castMemberImageUploadRes.error) throw new Error("Failed to upload cast member image")
			const toAppend: Person = {
				name: person.name,
				image: randomImageIdForCastMember,
				role: person.role
			}
			movie.cast?.push(toAppend)
		})

		const movieUploadSignedUrl = await getMovieUploadUrl(randomId)
		if (!movieUploadSignedUrl) throw new Error('Failed to get signed url for movie upload')
		const movieLength = movieFile?.size
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				setUploading(false)
				console.log("Movie successfully uploaded")
			}
		}
		// Event listeners
		xhr.addEventListener('loadstart', () => console.log('xhr loadstart'))
		xhr.addEventListener('load', () => console.log('xhr load'))
		xhr.addEventListener('error', (err) => console.log('xhr error', err))
		xhr.addEventListener('abort', () => console.log('xhr abort'))
		xhr.addEventListener('progress', (e) => {
			if (e.lengthComputable) {
				const percentage = (e.loaded / e.total) * 100
				console.log(`Uploading: ${percentage}%`)
			}
			console.log('Progress event')
		})
		xhr.upload.addEventListener('progress', (e) => {
			setUploading(true)
			if (e.lengthComputable) {
				const percentage = (e.loaded / e.total) * 100
				setUploadProgress(percentage)
				console.log(`Uploading: ${percentage}%`)
			}
			console.log('Progress event')
		})
		xhr.open('PUT', movieUploadSignedUrl, true)
		xhr.setRequestHeader('Content-Type', movieFile!.type)
		xhr.setRequestHeader('X-File-Size', movieLength!.toString())
		//const formData = new FormData()
		//if (!movieFileRef.current) throw new Error('No movie file selected')
		//formData.append('file', movieFileRef.current.files![0])
		//console.log(formData)
		console.log(movieUploadSignedUrl)
		xhr.send(movieFile!)
	}

	return (
		<div className='w-full max-w-[1000px] flex flex-col gap-2 p-4'>
			{uploading && <Progress progress={uploadProgress} />}

			<form className='flex flex-col gap-2 p-2 border rounded-md' onSubmit={previewCast}>
				<label htmlFor="cast" className='font-bold text-2xl'>Cast of movie</label>
				<div className='flex flex-wrap gap-2'>
				{cast.map((person, index) => (
					<div key={index} className='flex flex-col justify-center items-center gap-2'>
						<div className='w-16 h-16 rounded-full overflow-hidden'>
							{person.image && <img className='w-full h-full object-cover' src={URL.createObjectURL(person.image)} alt="" /> }
						</div>
						<div>
							<div>{person.name} as </div>
							<div>{person.role}</div>
						</div>
					</div>
				))}
				</div>
				<label htmlFor="name">Name</label>
				<input type="text" id='name' value={uname} onChange={(e) => setUname(e.target.value)} required/>
				<label htmlFor="image">Picture of cast member</label>
				<input type="file" accept='.jpg' id='image' onChange={async (e) => {
					if (!e.target.files) throw new Error('No files selected')
					const file = e.target.files[0]
					const blob = new Blob([file], { type: file.type })
					setUimage(blob)
				}} required/>
				<label htmlFor="role">Role</label>
				<input type="text" id='role' value={urole} onChange={(e) => setUrole(e.target.value)} required/>
				<input className='theme-button' type="submit" value="Submit" />
			</form>

			<form className='flex flex-col gap-2 border rounded-md p-2' onSubmit={addGenre}>
				<label htmlFor="genres" className='font-bold text-2xl'>Genres of movie</label>
				<div className='flex flex-wrap gap-2'>
				{genres.map((genre, index) => (
					<button className='theme-button' key={index} onClick={() => {
						genres.splice(index, 1)
						setGenres([...genres])
					}}>{genre}</button>
				))}
				</div>
				<input type="text" id="genre" name="genre" value={currentgenre} onChange={(e) => setCurrentGenre(e.target.value)} />
				<input type="submit" value="Add" className='theme-button' />
			</form>

			<form onSubmit={submitForm} className='w-full flex flex-col gap-2 border rounded-md p-2'>
				<h1 className='font-bold text-2xl'>Movie Details</h1>
				<label htmlFor="title">Title</label>
				<input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" required />
				<label htmlFor="poster">Upload Thumbnail/Poster for movie</label>
				{poster && <img className='w-20' src={ URL.createObjectURL(poster) } alt="" />}
				<input onChange={async (e) => {
					if (!e.target.files) {
						alert('No files selected');
						return
					}
					const blob = new Blob([e.target.files[0]], { type: e.target.files[0].type })
					setPoster(blob)
				}} type="file" id="poster" name="poster" required />
				<label htmlFor="price">Price</label>
				<input value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="price" name="price" required />
				<label htmlFor="year">Release Date</label>
				<input value={year} onChange={(e) => setYear(e.target.value)} type="date" id="year" name="year" required />
				<span>Movie Runtime</span>
				<label htmlFor="hours">Hours</label>
				<input value={hours} onChange={(e) => setHours(e.target.value)} type="number" id="hours" name="hours" required />
				<label htmlFor="minutes">Minutes</label>
				<input value={minutes} onChange={(e) => setMinutes(e.target.value)} type="number" id="minutes" name="minutes" required />
				<label htmlFor="synopsis">Synopsis</label>
				<textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} id="synopsis" name="synopsis" required />
				<label htmlFor="video">Movie file</label>
				<input ref={movieFileRef} type="file" accept='.mp4' id='video' onChange={(e) => {
					if (!e.target.files) throw new Error('No files selected')
					const file = e.target.files[0]
					setMovieFile(file)
				}} />
				<input type="submit" value="submit" className='theme-button' />
			</form>

			<footer className='p-10'></footer>

		</div>
	)
}
