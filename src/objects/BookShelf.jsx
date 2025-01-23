import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function BookShelf(props) {
    const books = useRef()
    const material = useRef()

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
        const loader = new THREE.TextureLoader()
        material.current = [
            new THREE.MeshBasicMaterial({ map: loader.load("world-war-z-front.jpg") }), // Right face
            new THREE.MeshBasicMaterial({ map: loader.load("back.jpg") }), // Left face
            new THREE.MeshBasicMaterial({ map: loader.load("pagetop.jpg") }), // Top face
            new THREE.MeshBasicMaterial({ map: loader.load("pagebottom.jpg") }), // Bottom face
            new THREE.MeshBasicMaterial({ map: loader.load("back.jpg") }), // Front face
            new THREE.MeshBasicMaterial({ map: loader.load("pagefront.jpg") }), // Back face
        ]
        const color = new THREE.Color()

        for (let i = 0; i < props.iterate; i++) {
            const xPosition = calculateWithLimit(props.gap, i, props.columnLimit)
            const yPosition = checkRow(props.rows, props.columnLimit, i)

            const position = new THREE.Vector3(xPosition, yPosition, 0)
            const quaternion = new THREE.Quaternion()
            const scale = new THREE.Vector3(0.2, 1, 0.75)

            const matrix = new THREE.Matrix4()
            matrix.compose(
                position,
                quaternion,
                scale
            )
            color.setHSL(Math.random(), 1.0, 0.5)
            books.current.setMatrixAt(i, matrix)
            books.current.setColorAt(i, color)
            books.current.material = material.current
        }
    }, [])

    return (
        <>
            { React.cloneElement(props.children, { books, count: props.iterate, enableClick: true }) }
        </>
    )
}