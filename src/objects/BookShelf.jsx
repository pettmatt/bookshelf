import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function BookShelf(props) {
    const books = useRef()

    function calculateWithLimit(gap, index, limit) {
        const calculation = gap * index
        if (index >= limit) {
            return index % limit * gap
        }

        return calculation
    }

    function checkRow(_rows, columns, index) {
        // Needs to be added row limit later if there is supposed to be more than one bookshelf.
        if (index >= columns) {
            return Math.floor(index / columns)
        }

        return 0
    }

    useEffect(() => {
        const color = new THREE.Color()
        for (let i = 0; i < props.iterate; i++) {
            const xPosition = calculateWithLimit(props.gap, i, props.columns)
            const yPosition = checkRow(props.rows, props.columns, i)

            const position = new THREE.Vector3(xPosition, yPosition, 0)
            const quaternion = new THREE.Quaternion()
            const scale = new THREE.Vector3(0.3, 1, 1)

            const matrix = new THREE.Matrix4()
            matrix.compose(
                position,
                quaternion,
                scale
            )
            color.setHSL(Math.random(), 1.0, 0.5)
            books.current.setMatrixAt(i, matrix)
            books.current.setColorAt(i, color)
        }
    }, [])

    return (
        <>
            { React.cloneElement(props.children, { books, count: props.iterate }) }
        </>
    )
}