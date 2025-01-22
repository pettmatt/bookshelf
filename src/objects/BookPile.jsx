import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function BookPile(props) {
    const books = useRef()
    const material = useRef()

    function calculateWithLimit(thicknessArray, limit, index) {
		let currentThickness = 0 // Tracks the thickness
		let currentIndexStart = Math.floor(index / limit) * limit // Makes sure the loop doesn't process earlier iterations (which creates floating items)
	
		for (let i = currentIndexStart; i < index; i++) {
			currentThickness += thicknessArray[i]
		}
	
		// Add the current item to the current thickness
		currentThickness += thicknessArray[index]
	
		// Return the position of the current item within its position
		return currentThickness - thicknessArray[index]
    }

    function checkPileHeight(_piles, pileLimit, index) {
		const padding = 0.3 // How far each pile should be from each other

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
		const coverOptions = {
			shininess: 75,
			specular: "#333",
			emissive: "#000"
		}

        const loader = new THREE.TextureLoader()
        material.current = [
            new THREE.MeshPhongMaterial({ map: loader.load("/covers/world-war-z-front.jpg"), ...coverOptions }), // Right face
            new THREE.MeshPhongMaterial({ map: loader.load("back.jpg"), ...coverOptions }), // Left face
            new THREE.MeshPhongMaterial({ map: loader.load("spine.jpg"), ...coverOptions }), // Front face
            new THREE.MeshBasicMaterial({ map: loader.load("pagetop.jpg") }), // Top face
            new THREE.MeshBasicMaterial({ map: loader.load("pagebottom.jpg") }), // Bottom face
            new THREE.MeshBasicMaterial({ map: loader.load("pagefront.jpg") }), // Back face
        ]
		material.current.glossinessMap
        const color = new THREE.Color()

		const bookThicknesses = []
		const thickness = [0.2, 0.6, 0.15, 0.45, 0.79, 0.1, 0.1, 0.2, 0.1, 0.15, 0.2, 0.1, 0.2, 0.1, 0.79]

        for (let i = 0; i < props.books; i++) {
			bookThicknesses.push(thickness[i])

			const xPosition = checkPileHeight(props.piles, props.pileLimit, i)
			// The thickness is dymanic which needs to be accounted for when setting position in Y-axis
			// Because object's middle point is in the center the Y-position needs to be offset
            const yPosition = calculateWithLimit(bookThicknesses, props.pileLimit, i) + (bookThicknesses[i] * 0.5)

            const position = new THREE.Vector3(xPosition, yPosition, 0)
            const quaternion = handleQuaternionRotation()
            const scale = new THREE.Vector3(thickness[i], 1, 0.75)

            const matrix = new THREE.Matrix4()
            matrix.compose(
                position,
                quaternion,
                scale
            )

            color.setHSL(Math.random(), 1.0, 0.85)
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