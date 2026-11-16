import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const unavailableAgenticResources = new Set([
  '/.well-known/ard.json',
  '/.well-known/ai-catalog.json',
])

const agenticResource404 = () => {
  const middleware = (request, response, next) => {
    const pathname = request.url?.split('?')[0]
    if (!unavailableAgenticResources.has(pathname)) {
      next()
      return
    }

    response.statusCode = 404
    response.setHeader('Content-Type', 'application/json; charset=utf-8')
    response.end(JSON.stringify({ error: 'Not Found' }))
  }

  return {
    name: 'agentic-resource-404',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}

export default defineConfig({
  plugins: [react(), agenticResource404()],
  base: './',
})
