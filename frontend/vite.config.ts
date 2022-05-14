import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	envPrefix: 'PUBLIC_',

	publicDir: './public',

	server: {
		host: '0.0.0.0',
		port: Number(process.env.FRONTEND_PORT) || 3000,
	},

})
