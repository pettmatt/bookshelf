import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function BookPile(props) {
    const books = useRef()
    const material = useRef()

    function calculateWithLimit(gap, limit, index) {
        const calculation = gap * index
        if (index >= limit) {
            return index % limit * gap
        }

        return calculation
    }

    function checkPileHeight(_piles, pileLimit, index) {
		const padding = 0.3

        if (index >= pileLimit) {
			const pileIndex = Math.floor(index / pileLimit)
            return pileIndex + (pileIndex * padding)
        }

        return 0
    }

	function handleQuaternionRotation() {
		const quaternion01 = new THREE.Quaternion()
		const quaternion02 = new THREE.Quaternion()

		// At first place the book on its side
		const axis01 = new THREE.Vector3(0, 0, 1) // Specify axis that is rotated
		const angle01 = Math.PI / 2 // 90 degrees in radians
		quaternion01.setFromAxisAngle(axis01, angle01)

		// Add tasteful amount of rotation in the Y-axis
		const axis02 = new THREE.Vector3(1, 0, 0) // Specify axis that is rotated
		const angle02 = Math.PI / Math.random(10) // 90 degrees in radians
		quaternion02.setFromAxisAngle(axis02, angle02)

		return quaternion01.multiply(quaternion02)
	}

    useEffect(() => {
        const loader = new THREE.TextureLoader()
        material.current = [
            new THREE.MeshBasicMaterial({ map: loader.load('test.webp') }), // Right face
            new THREE.MeshBasicMaterial({ map: loader.load('back.jpg') }), // Left face
            new THREE.MeshBasicMaterial({ map: loader.load('pagetop.jpg') }), // Top face
            new THREE.MeshBasicMaterial({ map: loader.load('pagebottom.jpg') }), // Bottom face
            new THREE.MeshBasicMaterial({ map: loader.load('spine.jpg') }), // Front face
            new THREE.MeshBasicMaterial({ map: loader.load('pagefront.jpg') }), // Back face
        ]
        const color = new THREE.Color()

        for (let i = 0; i < props.books; i++) {
            const xPosition = checkPileHeight(props.piles, props.pileLimit, i)
            const yPosition = calculateWithLimit(props.gap, props.pileLimit, i)

            const position = new THREE.Vector3(xPosition, yPosition, 0)
            const quaternion = handleQuaternionRotation()
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
            { React.cloneElement(props.children, { books, count: props.books, position: props.position || [0, 0, 0] }) }
        </>
    )
}