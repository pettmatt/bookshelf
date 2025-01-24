import React, { useEffect, useRef } from 'react'

export default function Overlay3D(props) {
	const overlayCamera = useRef()
	const overlayMesh = useRef()

	useEffect(() => {
		// NOTE: Layer ID is expected to be an integer from 0 to 31
		// https://threejs.org/docs/?q=camera#api/en/core/Layers
		overlayMesh.current.layers.set(props.layerId)
		overlayCamera.current.layers.enable(props.layerId)
	}, [])

	return <>
		<orthographicCamera ref={ overlayCamera } makeDefault={ false } position={ [0, 1, 2] } /> {/* args={ [] } */}
		<mesh ref={ overlayMesh } position={ [0, 1, 0] }>
			<ambientLight />
			{/* <pointLight position={ [10, 10, 10] } /> */}

			<mesh>
				{ React.cloneElement(props.children) }
			</mesh>
		</mesh>
	</>
}