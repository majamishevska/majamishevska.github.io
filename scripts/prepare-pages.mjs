import { copyFile, mkdir } from 'node:fs/promises'

const routes = ['about', 'projects', '3pt', 'lunar', 'pit-ne']

await Promise.all(routes.map(async (route) => {
  await mkdir(`dist/${route}`, { recursive: true })
  await copyFile('dist/index.html', `dist/${route}/index.html`)
}))
await copyFile('dist/index.html', 'dist/404.html')
