import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import React from 'react'
import Book from './objects/Book'
import BookShelf from './objects/BookShelf'
import BookPile from './objects/BookPile'
import { useFrame } from '@react-three/fiber'

export default function Experience()
{
	const spotLightRef = React.useRef()
	const visualizedLight = React.useRef()

	useFrame(() => {
		if (visualizedLight.current && spotLightRef.current) {
		  // Update light position if needed
		  visualizedLight.current.position.copy(spotLightRef.current.position);
		}
	})

    return <>
        <Perf position="top-left" />

        <color args={ [ "black" ] } attach="background" />
        <OrbitControls makeDefault />

        {/* <directionalLight castShadow position={ [5, 10, 5] } intensity={ 1.0 } /> */}
        {/* <ambientLight intensity={ 0.1 } /> */}
		<spotLight castShadow ref={ spotLightRef } position={ [0, 5, 0] } angle={ 2 } penumbra={ 0.5 } intensity={ 2 } />
		<mesh ref={ visualizedLight }>
			<sphereGeometry args={ [ 0.2 ] } />
			<meshBasicMaterial wireframe={ true } color="yellow" opacity={ 0.3 } transparent />
		</mesh>

		{/* Floor */}
		<mesh visible receiveShadow position={ [0, -0.1, 0] } rotation={ [ -Math.PI / 2, 0, 0 ] }>
			<planeGeometry args={ [100, 100] } />
			<meshStandardMaterial color="white" />
		</mesh>

        {/* <BookShelf iterate={ 15 } rows={ 5 } columnLimit={ 10 } gap={ 0.35 }>
            <Book />
        </BookShelf> */}

		<BookPile books={ 14 } piles={ 3 } pileLimit={ 5 } gap={ 0.2 }>
            <Book rotationY={ 90 } />
        </BookPile>
    </>
}