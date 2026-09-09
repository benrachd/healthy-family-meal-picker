/**
 * Verify GitHub Pages build output (run after npm run build:ghpages).
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const BASE = '/healthy-family-meal-picker/'
let failed = 0

function pass(msg) {
  console.log(`✓ ${msg}`)
}

function fail(msg) {
  console.error(`✗ ${msg}`)
  failed++
}

const distIndex = join(ROOT, 'dist/index.html')
const dist404 = join(ROOT, 'dist/404.html')
const distSw = join(ROOT, 'dist/sw.js')
const distManifest = join(ROOT, 'dist/manifest.webmanifest')
const distRegister = join(ROOT, 'dist/registerSW.js')

if (!existsSync(distIndex)) {
  fail('dist/index.html missing — run npm run build:ghpages first')
  process.exit(1)
}

const html = readFileSync(distIndex, 'utf8')

if (html.includes(`${BASE}assets/`)) pass(`index.html asset paths use base ${BASE}`)
else fail(`index.html missing base-prefixed asset paths (${BASE}assets/)`)

if (html.includes(`${BASE}registerSW.js`)) pass('Service worker registration uses base path')
else fail('registerSW.js path missing base prefix in index.html')

if (existsSync(dist404)) pass('404.html exists (SPA routing on GitHub Pages)')
else fail('404.html missing — run postbuild-ghpages')

if (existsSync(join(ROOT, 'dist/.nojekyll'))) pass('.nojekyll exists')
else fail('.nojekyll missing')

if (existsSync(join(ROOT, 'dist/images/recipes/wrap.jpg'))) {
  pass('Recipe images present in dist')
} else {
  fail('Recipe images missing from dist/images/recipes/')
}

if (existsSync(distManifest)) {
  const manifest = JSON.parse(readFileSync(distManifest, 'utf8'))
  if (manifest.start_url === BASE) pass(`Manifest start_url: ${BASE}`)
  else fail(`Manifest start_url should be ${BASE}, got ${manifest.start_url}`)
  if (manifest.scope === BASE) pass(`Manifest scope: ${BASE}`)
  else fail(`Manifest scope should be ${BASE}, got ${manifest.scope}`)
}

if (existsSync(distRegister)) {
  const reg = readFileSync(distRegister, 'utf8')
  if (reg.includes(`'${BASE}sw.js'`) || reg.includes(`"${BASE}sw.js"`)) {
    pass('registerSW.js registers sw.js with base path')
  } else if (reg.includes(`${BASE}sw.js`)) {
    pass('registerSW.js registers sw.js with base path')
  } else {
    fail('registerSW.js does not register sw.js with correct base path')
    console.error('  Content:', reg)
  }
  if (reg.includes(`scope: '${BASE}'`) || reg.includes(`scope: "${BASE}"`)) {
    pass(`registerSW.js scope: ${BASE}`)
  } else if (reg.includes(`scope: '${BASE.slice(0, -1)}'`)) {
    pass('registerSW.js scope configured')
  } else if (reg.includes(BASE)) {
    pass('registerSW.js includes base path in scope')
  } else {
    fail('registerSW.js scope missing base path')
  }
}

if (existsSync(distSw)) {
  const sw = readFileSync(distSw, 'utf8')
  if (sw.includes('images/recipes/')) pass('Service worker precaches recipe images')
  else fail('Service worker missing recipe image precache')
  if (sw.includes('index.html')) pass('Service worker precaches index.html')
  else fail('Service worker missing index.html precache')
}

if (existsSync(join(ROOT, '.github/workflows/deploy.yml'))) {
  pass('GitHub Actions deploy workflow present')
} else {
  fail('Missing .github/workflows/deploy.yml')
}

console.log('')
if (failed === 0) {
  console.log('GitHub Pages configuration verified.')
  process.exit(0)
} else {
  console.error(`${failed} GitHub Pages check(s) failed.`)
  process.exit(1)
}
