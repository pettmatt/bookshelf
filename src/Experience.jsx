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
import { useFrame, useThree } from '@react-three/fiber'

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

	const { camera, scene, gl, size } = useThree()
	const overlayCamera = useRef(null)
	const mainGroup = useRef(null)

	useEffect(() => {
		// NOTE: Layer ID is expected to be an integer from 0 to 31
		// https://threejs.org/docs/?q=camera#api/en/core/Layers
		camera.layers.set(1)
		// camera.layers.disable(1)
		// camera.layers.enable(0)
		console.log("main camera set")
	}, [camera])

	useEffect(() => {
		// Initialize layers when pile is selected
		if (selectedPile !== null) {
			overlayCamera.current.layers.set(2)
			// overlayCamera.current.layers.disable(0)
			// overlayCamera.current.layers.enable(1)
			console.log("overlaycamera set")
		}
	}, [overlayCamera])

	useEffect(() => {
		mainGroup.current.layers.set(1)
		console.log("mainGroup set")
	}, [mainGroup])

	useEffect(() => {
		console.log("SelectPile set")
	}, [selectPile])

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

	function selectPile(e, index) {
		e.stopPropagation()
		const selectedSamePile = selectedPile !== null && piles[index] === selectedPile

		if (selectedSamePile) {
			setSelectedPile(null)
		} else {
			setSelectedPile(piles[index])
		}
	}

	useFrame(() => {
		if (!camera || !overlayCamera.current) return

		// Render the main camera
		gl.setViewport(0, 0, size.width, size.height) // Full viewport for main camera
		gl.render(scene, camera)

		// Render the overlay camera
		// if (overlayCamera.current && selectedPile !== null) {
			gl.setViewport(0, size.height / 2, size.width / 2, size.height / 2) // Limited viewport for overlay camera
			gl.render(scene, overlayCamera.current)
		// }

		// Ensure the viewport is reset to the full canvas for events
		gl.setViewport(0, 0, size.width, size.height)
	})

    return <>
		<group ref={ mainGroup }>
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
						<React.Fragment key={ `fragment-${index}` }>
							<SpotLight position={ pile.position } delay={ pile.lightDelay } flicker={ pile.lightFlicker } />
							<BookPile onClick={ (event) => selectPile(event, index) } name={ pile.name } position={ pile.position } books={ 14 } piles={ 3 } pileLimit={ 5 } gap={ 0.2 }>
								<Book rotationY={ 90 } />
							</BookPile>
						</React.Fragment>
					)
				})
			}
		</group>

		{ (selectedPile !== null) &&
			<Overlay3D camera={ overlayCamera }>
				<BookShelf books={ selectedPile.entries } iterate={ 15 } rows={ 3 } columnLimit={ 10 } gap={ 0.3 }>
					<Book />
				</BookShelf>
			</Overlay3D>
		}
    </>
}