import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: {
			'@pages': path.resolve(__dirname, './src/pages'),
			'@components': path.resolve(__dirname, './src/components'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@services': path.resolve(__dirname, './src/services'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@store': path.resolve(__dirname, './src/store'),
			'@utils': path.resolve(__dirname, './src/utils'),
		},
	},
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
