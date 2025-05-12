import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'src/main.jsx'), // or 'src/main.js' depending on your file
        },
    },
});
