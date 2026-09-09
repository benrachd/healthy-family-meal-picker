/**
 * Generates PNG PWA icons from favicon.svg (run automatically before build).
 */
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = join(root, 'public', 'favicon.svg')

if (!existsSync(svg)) {
  console.warn('generate-pwa-icons: favicon.svg not found, skipping')
  process.exit(0)
}

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.warn('generate-pwa-icons: sharp not installed, skipping (SVG icons still used)')
  process.exit(0)
}

const sizes = [
  { size: 192, file: 'pwa-192.png' },
  { size: 512, file: 'pwa-512.png' },
  { size: 180, file: 'apple-touch-icon.png' },
]

for (const { size, file } of sizes) {
  await sharp(svg).resize(size, size).png().toFile(join(root, 'public', file))
  console.log(`✓ public/${file}`)
}
