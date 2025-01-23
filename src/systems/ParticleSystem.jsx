import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Even if this component has a generic name it focuses on generating 
// objects at random position that slowly move to random direction

export default function ParticleSystem({ particleCount, particleSpeed }) {
	const mesh = useRef()
	const dummy = useMemo(() => new THREE.Object3D(), [])

	// The generator
	const particles = useMemo(() => {
		const temp = []

		for (let i = 0; i < particleCount; i++) {
			const time = Math.random() * 100
			const factor = Math.random() * (120 - 20) + 20
			const speed = Math.random() * (particleSpeed * 0.001)

			const x = Math.random() * (60 - (-60)) + (-60)
			const y = Math.random() * (60 - (-60)) + (-60)
			const z = Math.random() * (60 - (-60)) + (-60)

			temp.push({ time, factor, speed, x, y, z })
		}

		return temp
	}, [particleCount])

	// Add some movement to the particles
	useFrame(() => {
		particles.forEach((particle, index) => {
			let { factor, speed, x, y, z } = particle

			// Update the particle time
			const time = (particle.time += speed)

			// Update the particle position based on the time
			dummy.position.set(
				x + Math.cos((time / 10) * factor) + (Math.sin(time * 1) * factor) / 10,
				y + Math.sin((time / 10) * factor) + (Math.cos(time * 2) * factor) / 10,
				z + Math.cos((time / 10) * factor) + (Math.sin(time * 3) * factor) / 10
			)

			const scale = Math.cos(time)
			dummy.scale.set(scale, scale, scale)
			dummy.updateMatrix()

			if (dummy.position.y < 1) {
				dummy.opacity = Math.random() * 0.15
			} else {
				dummy.opacity = 0.1
			}

			// Apply the matrix
			mesh.current.setMatrixAt(index, dummy.matrix)
		})

		mesh.current.instanceMatrix.needsUpdate = true
	})

    return (
		<instancedMesh ref={ mesh } args={ [null, null, particleCount] }>
			<circleGeometry args={ [0.01, 16] } />
			<meshStandardMaterial color="#fff" transparent opacity={ 0.15 } />
		</instancedMesh>
	)
}