/**
 * GitHub Pages post-build: SPA fallback + disable Jekyll processing.
 */
import { copyFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')

copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
writeFileSync(join(dist, '.nojekyll'), '')

console.log('✓ GitHub Pages: created 404.html (SPA fallback)')
console.log('✓ GitHub Pages: created .nojekyll')
