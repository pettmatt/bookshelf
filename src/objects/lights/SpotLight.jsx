import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { IsDevelopmentEnvironment } from '../../services/environment'

export default function SpotLight(props) {
	const [intensity, setIntensity] = useState(0)

	const spotLightRef = useRef()
	const visualizedLight = useRef()

	useFrame(() => {
		if (visualizedLight.current && spotLightRef.current) {
		  // Update light position if needed
		  visualizedLight.current.position.copy(spotLightRef.current.position)
		}
	})

	useEffect(() => {
		const interval = setInterval(() => setIntensity(20), props.delay * 1000)
		return () => clearInterval(interval)
	}, [])

	function increaseYValue(locationArray) {
		if (!Array.isArray(locationArray)) return

		const newLocation = [...locationArray]
		const setY = newLocation[1]
		newLocation[1] = (setY < 6) ? 6 : setY
		newLocation[2] = newLocation[2] + 2
		return newLocation
	}

	// Add flicker effect to the light if props.flicker is true

	return <>
		<spotLight castShadow ref={ spotLightRef } position={ increaseYValue(props.position) || [0, 5, 0] } angle={ 2 } penumbra={ 0.2 } intensity={ intensity } />
		{ (IsDevelopmentEnvironment()) &&
			<mesh ref={ visualizedLight }>
				<sphereGeometry args={ [ 0.2 ] } />
				<meshBasicMaterial wireframe={ true } color="yellow" opacity={ 0.3 } transparent />
			</mesh>
		}
	</>
}