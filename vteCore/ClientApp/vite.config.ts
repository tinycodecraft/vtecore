import serverOption from './serverOption'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath,URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  server : serverOption,
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },  
})
