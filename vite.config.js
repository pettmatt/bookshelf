import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'
import restart from 'vite-plugin-restart'
import glsl from 'vite-plugin-glsl'
import dotenv from 'dotenv'

dotenv.config()

export default {
    root: 'src/',
    publicDir: '../public/',
	define: {
		'import.meta.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL),
		'import.meta.env.VITE_CACHE_EXPIRATION_DAY': JSON.stringify(process.env.VITE_CACHE_EXPIRATION_DAY),
	},
    plugins: [
        // Restart server on static/public file change
        restart({ restart: [ '../public/**', ] }),
        react(),
        glsl(),

        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id)
            {
                if (!id.match(/src\/.*\.js$/))
                    return null

                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
    ],
    server: {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build: {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    }
}