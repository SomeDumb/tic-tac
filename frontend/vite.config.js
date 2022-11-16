import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        host: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://backend:8000',
            }
        },
    },
    build: {manifest: true},
    plugins: [react()]
})
