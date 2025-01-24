import './style.css'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { IsDevelopmentEnvironment } from './services/environment.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))
const camera = {
	fov: 45,
	near: 0.1,
	far: 400,
	position: [0, 5, 12],
	makeDefault: true
}

root.render(
	(IsDevelopmentEnvironment()) ?
		<StrictMode>
			<Canvas shadows camera={ camera }>
				<Experience />
			</Canvas>
		</StrictMode>
	:
		<Canvas shadows camera={ camera }>
			<Experience />
		</Canvas>
)