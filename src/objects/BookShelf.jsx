import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function BookShelf(props) {
    const books = useRef()

    function calculateWithLimit(calculation, index, limit) {
        if (index > limit) {
            return index % limit
        }

        return calculation
    }

    function checkWhichRow(_rows, columns, index) {
        // Needs to be added row limit later if there is supposed to be more than one bookshelf.
        if (index > columns) {
            return Math.floor(index / columns)
        }

        return 0
    }

    useEffect(() => {
        books.current = new THREE.InstancedMesh()
        for (let i = 0; i < props.iterate; i++) {
            const xPosition = calculateWithLimit(props.gap * i, i, props.columns)
            const yPosition = checkWhichRow(props.rows, props.columns, i)

            const position = new THREE.Vector3(xPosition, yPosition, 0)
            const quaternion = new THREE.Quaternion()
            const scale = new THREE.Vector3(1, 1, 1)

            const matrix = new THREE.Matrix4()
            matrix.compose(
                position,
                quaternion,
                scale
            )
            books.current.setMatrixAt(i, matrix)
        }
    }, [])

    return (
        <>
            { React.cloneElement(props.children, { books }) }
        </>
    )
}