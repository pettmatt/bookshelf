import { shaderMaterial, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
// import fragmentShader from '../shaders/book/fragment.glsl'
// import vertexShader from '../shaders/book/vertex.glsl'

// const material = shaderMaterial(
//     {
//         uTime: 0,
//         uColorStart: new THREE.Color('#ffffff'),
//         uColorEnd: new THREE.Color('#440033'),
//     },
//     vertexShader,
//     fragmentShader
// )

export default function Book({ meshProperties, boxProperties, boxMesheProperties }) {
    // const bakedTexture = useTexture('../model/textureName.jpg')
    // bakedTexture.flipY = false

    const book = useRef()
    useFrame((state, delta) => {
        const time = state.clock.elapsedTime

        // Placeholder animation
        book.current.rotation.y += delta * 0.25
        book.current.rotation.z += delta * 0.15
        book.current.position.y = Math.sin(time) * 0.1
    })

    return <mesh ref={ book } castShadow scale={ [0.3, 1, 1] } position={ [ 0, 0, 0 ] } { ...meshProperties }>
        <boxGeometry { ...boxProperties } />
        <meshStandardMaterial color="orange" { ...boxMesheProperties } />
    </mesh>
}