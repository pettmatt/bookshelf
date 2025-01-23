import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import fragmentShader from '../shaders/book/fragment.glsl'
import vertexShader from '../shaders/book/vertex.glsl'

const material = shaderMaterial(
    {
        uTime: 0
    },
    vertexShader,
    fragmentShader
)

extend({ material })

export default function Book({ books, material, count, position, enableClick }) {
	const { raycaster, camera, mouse } = useThree()

	function selectBook() {
		if(!books.current)
			return

		raycaster.setFromCamera(mouse, camera)
		const intersections = raycaster.intersectObject(books.current)

		if (intersections.length > 0) {
			const instanceId = intersections[0].instanceId
			console.log("Clicked", instanceId, intersections[0])

			// For some reason below doesn't produce anything. Probably because the instance doesn't have material set correctly
			// const color = new THREE.Color(Math.random(), Math.random(), Math.random())
			// books.current.setColorAt(instanceId, color)
			// books.current.instanceColor.needsUpdate = true

			// Change position
			const matrix = new THREE.Matrix4()
			books.current.getMatrixAt(instanceId, matrix)

			const position = new THREE.Vector3()
			const rotation = new THREE.Quaternion()
			const scale = new THREE.Vector3()
			matrix.decompose(position, rotation, scale)

			position.add(new THREE.Vector3(0, 0, 2))

			matrix.compose(position, rotation, scale)
			books.current.setMatrixAt(instanceId, matrix)
			books.current.instanceMatrix.needsUpdate = true
		}
	}

    // const bakedTexture = useTexture('../model/textureName.jpg')
    // bakedTexture.flipY = false

    // const material = useRef()
    // useFrame((state, delta) => {
    //     const time = state.clock.elapsedTime

    //     // Placeholder animation
    //     material.current.rotation.y += delta * 0.25
    //     material.current.rotation.z += delta * 0.15
    //     material.current.position.y = Math.sin(time) * 0.1
    // })

    return (
		<instancedMesh ref={ books } castShadow receiveShadow 
			args={ [null, null, count] } position={ position }
			onClick={ selectBook }
		>
			<boxGeometry />
			<meshStandardMaterial color="orange" />
		</instancedMesh>
	)
}