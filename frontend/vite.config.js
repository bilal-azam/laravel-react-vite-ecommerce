import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin  from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), eslintPlugin({
        cache: false,
        include: ['./src/**/*.js', './src/**/*.jsx'],
        exclude: [],
    }),],
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 3000,
    },
});
