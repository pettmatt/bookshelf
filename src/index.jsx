import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { StrictMode } from 'react'
import Experience from './Experience.jsx'
import { IsDevelopmentEnvironment } from './services/environment.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))

function Index() {
	return <>

	</>
}

root.render(
	(IsDevelopmentEnvironment()) ?
		<StrictMode>
			<Canvas
				shadows
				camera={ {
					fov: 45,
					near: 0.1,
					far: 300,
					position: [ 0, 5, 12 ]
				} }
			>
				<Experience />
			</Canvas>
		</StrictMode>
	:
		<Canvas
			shadows
			camera={ {
				fov: 45,
				near: 0.1,
				far: 300,
				position: [ 0, 5, 12 ]
			} }
		>
			<Experience />
		</Canvas>
)