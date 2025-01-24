import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import React, { useEffect, useRef, useState } from 'react'
import Book from './objects/Book'
import BookShelf from './objects/BookShelf'
import BookPile from './objects/BookPile'
import SpotLight from './objects/lights/SpotLight'
import Overlay3D from './UI/3D/Overlay3D'
import ParticleSystem from './systems/ParticleSystem'
import { getEntries } from './services/retriever'
import { IsDevelopmentEnvironment } from './services/environment'
import { handleCaching, checkCachedObject } from './services/cache'
import { useThree } from '@react-three/fiber'

export default function Experience() {
	const [message, setMessage] = useState(false)
	const [selectedPile, setSelectedPile] = useState(null)
	const [entries, setEntries] = useState([]) // Unorganized entries
	const [piles, setPiles] = useState([ // Organized entries
		{
			name: "Reading",
			position: [0, 0, 0],
			lightDelay: 2,
			lightFlicker: false,
			entries: []
		},
		{
			name: "To be read",
			position: [-7, 0, -7.5],
			lightDelay: 3,
			lightFlicker: false,
			entries: []
		},
		{
			name: "Read",
			position: [7, 0, -7.5],
			lightDelay: 4.5,
			lightFlicker: true,
			entries: []
		}
	])

	const { camera } = useThree()
	const mainScene = useRef()

	useEffect(() => {
		console.log("selected pile", selectedPile)
	}, [selectPile])

	useEffect(() => {
		console.log("Experience::EntriesSet:", entries)
	}, [entries])

	useEffect(() => {
		// Set layers
		mainScene.current.layers.set(0)
		camera.layers.disableAll()
		camera.layers.enable(0)
		console.log("main layers", camera.layers)
	}, [camera])
	
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

	function selectPile(e, index) {
		e.stopPropagation()
		const selectedSamePile = selectedPile !== null && piles[index] === selectedPile

		if (selectedSamePile) {
			setSelectedPile(null)
		} else {
			setSelectedPile(piles[index])
		}
	}

    return <>
		<mesh ref={ mainScene }>
			{ (IsDevelopmentEnvironment()) &&
				<>
					<Perf position="top-left" />
					<OrbitControls makeDefault />
				</>
			}

			<ParticleSystem particleCount={ 60000 } particleSpeed={ 1 } />

			<color args={ ["black"] } attach="background" />

			{/* Floor */}
			<mesh visible receiveShadow position={ [0, 0, 0] } rotation={ [-Math.PI / 2, 0, 0] }>
				<planeGeometry args={ [100, 100] } />
				<meshStandardMaterial color="white" />
			</mesh>

			{
				piles.map((pile, index) => {
					return (
						<React.Fragment key={`fragment-${index}`}>
							<SpotLight position={ pile.position } delay={ pile.lightDelay } flicker={ pile.lightFlicker } />
							<BookPile onClick={ (event) => selectPile(event, index) } name={ pile.name } position={ pile.position } books={ 14 } piles={ 3 } pileLimit={ 5 } gap={ 0.2 }>
								<Book rotationY={ 90 } />
							</BookPile>
						</React.Fragment>
					)
				})
			}
		</mesh>

		{ (selectedPile !== null) &&
			<Overlay3D layerId={ 1 }>
				<BookShelf books={ selectedPile.entries } iterate={ 15 } rows={ 3 } columnLimit={ 10 } gap={ 0.3 }>
					<Book />
				</BookShelf>
			</Overlay3D>
		}
    </>
}