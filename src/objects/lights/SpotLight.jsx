import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { IsDevelopmentEnvironment } from '../../services/environment'

export default function SpotLight(props) {
	const spotLightRef = useRef()
	const visualizedLight = useRef()

	useFrame(() => {
		if (visualizedLight.current && spotLightRef.current) {
		  // Update light position if needed
		  visualizedLight.current.position.copy(spotLightRef.current.position);
		}
	})

	function increaseYValue(locationArray) {
		if (!Array.isArray(locationArray)) return

		const newLocation = [...locationArray]
		const setY = newLocation[1]
		newLocation[1] = (setY < 3) ? 3 : setY
		return newLocation
	}

	return <>
		<spotLight castShadow ref={ spotLightRef } position={ increaseYValue(props.position) || [0, 5, 0] } angle={ 2 } penumbra={ 0.5 } intensity={ 1.5 } />
		{ (IsDevelopmentEnvironment()) &&
			<mesh ref={ visualizedLight }>
				<sphereGeometry args={ [ 0.2 ] } />
				<meshBasicMaterial wireframe={ true } color="yellow" opacity={ 0.3 } transparent />
			</mesh>
		}
	</>
}