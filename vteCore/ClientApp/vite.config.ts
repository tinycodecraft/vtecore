import serverOption from './serverOption'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // console.log(JSON.stringify(env))

  return {
    server: {
      proxy: {
        '/test': {
          target: 'https://demo.dataverse.org/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/test/, '/search'),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, options.target + proxyReq.path)
            })

            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Receiving Response from the Target:', req.method, options.target + req.url)
            })

            proxy.on('error', (err, req, res) => {
              console.log('Error Occurred:', err)
            })
          },
        },
      },
      ...serverOption,
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  }
})
