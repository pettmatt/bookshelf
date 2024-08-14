import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import React from 'react'
import Book from './objects/Book'
import BookShelf from './objects/BookShelf'

export default function Experience()
{
    return <>
        <Perf position="top-left" />

        <color args={ [ "pink" ] } attach="background" />
        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [1, 2, 3] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <BookShelf iterate={ 10 } rows={ 5 } columns={ 10 } gap={ 1 }>
            <Book />
        </BookShelf>
    </>
}