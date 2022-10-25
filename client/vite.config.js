import { defineConfig } from 'vite'
import react from 'vite-preset-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [react(), svgr()],
    server:{
        port:3000
    }
})