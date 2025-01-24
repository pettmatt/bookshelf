import React, { useEffect, useRef } from 'react'

export default function Overlay3D(props) {
	const overlayGroup = useRef()

	useEffect(() => {
		overlayGroup.current.layers.set(2)
	}, [overlayGroup])

	useEffect(() => {
		console.log("Camera overlay", props.camera)
	}, [props.camera])

	return (
		<group ref={ overlayGroup } position={ [-1, 0.5, 5] }>
			<perspectiveCamera ref={ props.camera } position={ [0, 1, -2] } />
			<ambientLight />
			{/* <pointLight position={ [10, 10, 10] } /> */}

			{ React.cloneElement(props.children) }
		</group>
	)
}