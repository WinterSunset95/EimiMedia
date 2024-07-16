// Code: Admin Song Page
// Description: Form to upload song to s3 bucket and store song details in dynamoDB
// Called by: /admin/Admin.tsx

'use client'
import { useState, useEffect } from 'react'

export default function AdminSong() {

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submitting song')
	}

	return (
		<div className='w-full max-w-[1000px] flex flex-col gap-2 p-4'>
			<form className='w-full border rounded-md flex flex-col gap-2 p-2' onSubmit={handleSubmit}>
				<label htmlFor="title">Title</label>
				<input type="text" id='title' required/>
				<label htmlFor="artist">Artist</label>
				<input type="text" id='artist' required/>
				<label htmlFor="album">Album</label>
				<input type="text" id='album' required/>
				<label htmlFor="year">Year</label>
				<input type="number" id='year' required/>
				<label htmlFor="duration">Song duration (in seconds)</label>
				<input type="number" id='duration' required/>
				<label htmlFor="file">Song file</label>
				<input type="file" id='file' required/>
				<input type="submit" value="Submit" className='theme-button' />
			</form>
		</div>
	)
}
