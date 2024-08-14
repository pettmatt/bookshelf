import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
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

export default function Book({ meshProperties, boxProperties, boxMesheProperties, books }) {
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

    return <instancedMesh ref={ books } castShadow scale={ [0.3, 1, 1] } { ...meshProperties }>
        <boxGeometry { ...boxProperties } />
        <meshStandardMaterial color="orange" { ...boxMesheProperties } />
    </instancedMesh>
}