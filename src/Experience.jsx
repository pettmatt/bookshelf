import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import React from 'react'
import Book from './objects/Book'
import BookShelf from './objects/BookShelf'
import BookPile from './objects/BookPile'
import SpotLight from './objects/lights/SpotLight'

export default function Experience() {
	const piles = [{
		position: [0, 0, 0],
		delay: 2
	},
	{
		position: [7, 0, -7.5],
		delay: 3
	},
	{
		position: [-7, 0, -7.5],
		delay: 4
	}]

    return <>
        <Perf position="top-left" />

        <color args={ [ "black" ] } attach="background" />
        <OrbitControls makeDefault />

		{/* Floor */}
		<mesh visible receiveShadow position={ [0, -0.1, 0] } rotation={ [ -Math.PI / 2, 0, 0 ] }>
			<planeGeometry args={ [100, 100] } />
			<meshStandardMaterial color="white" />
		</mesh>

        {/* <BookShelf iterate={ 15 } rows={ 5 } columnLimit={ 10 } gap={ 0.35 }>
            <Book />
        </BookShelf> */}

		{ 
			piles.map((pile, key) => {
				return <React.Fragment key={`fragment-${key}`}>
					<SpotLight position={ pile.position } />
					<BookPile position={ pile.position } books={ 14 } piles={ 3 } pileLimit={ 5 } gap={ 0.2 }>
						<Book rotationY={ 90 } />
					</BookPile>
				</React.Fragment>
			})
		}
    </>
}