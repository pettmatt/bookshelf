import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import React, { useEffect, useState } from 'react'
import Book from './objects/Book'
import BookShelf from './objects/BookShelf'
import BookPile from './objects/BookPile'
import SpotLight from './objects/lights/SpotLight'
import { getEntries } from './services/retriever'
import { handleCaching, checkCachedObject } from './services/cache'
import { IsDevelopmentEnvironment } from './services/environment'
import ParticleSystem from './systems/ParticleSystem'

export default function Experience() {
	const [message, setMessage] = useState(false)
	const [selectedPile, setSelectedPile] = useState(null)
	const [entries, setEntries] = useState([]) // Unorganized entries
	const [piles, setPiles] = useState([ // Organized entries
		{
			name: "Reading",
			position: [0, 0, 0],
			delay: 2,
			entries: []
		},
		{
			name: "To be read",
			position: [7, 0, -7.5],
			delay: 3,
			entries: []
		},
		{
			name: "Read",
			position: [-7, 0, -7.5],
			delay: 4,
			entries: []
		}
	])

	useEffect(() => {
		console.log("Experience::EntriesSet:", entries)
	}, [entries])
	
	useEffect(() => {
		// Retrieve entries from memory or from the server
		const cacheEntries = checkCachedObject("entries")

		if (cacheEntries?.status.old) {
			getEntries()
				.then((body) => {
					if (body?.message) {
						console.warn("Experience::useEffect::message", response)
					} else {
						setEntries(body)
						handleCaching(body, "entries")
					}
				})
		} else {
			setEntries(cacheEntries.entries)
		}
	}, [])

	function selectPile(e) {
		e.stopPropagation()
		console.log("You selected a pile")


	}

    return <>
		{ (IsDevelopmentEnvironment()) && <>
				<Perf position="top-left" />
				<OrbitControls makeDefault />
			</>
		}

		<ParticleSystem particleCount={ 60000 } particleSpeed={ 1 } />

        <color args={ [ "black" ] } attach="background" />

		{/* Floor */}
		<mesh visible receiveShadow position={ [0, 0, 0] } rotation={ [ -Math.PI / 2, 0, 0 ] }>
			<planeGeometry args={ [100, 100] } />
			<meshStandardMaterial color="white" />
		</mesh>

		{ (selectedPile !== null) &&
			<BookShelf iterate={ 15 } rows={ 5 } columnLimit={ 10 } gap={ 0.35 }>
				<Book />
			</BookShelf>
		}

		{
			piles.map((pile, key) => {
				return <React.Fragment key={`fragment-${key}`}>
					<SpotLight position={ pile.position } />
					<BookPile onClick={ selectPile } name={ pile.name } position={ pile.position } books={ 14 } piles={ 3 } pileLimit={ 5 } gap={ 0.2 }>
						<Book rotationY={ 90 } />
					</BookPile>
				</React.Fragment>
			})
		}
    </>
}