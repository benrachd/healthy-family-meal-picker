/**
 * MVP verification script — run with: npm run verify
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const store = {}
globalThis.localStorage = {
  getItem: (k) => store[k] ?? null,
  setItem: (k, v) => { store[k] = v },
  removeItem: (k) => { delete store[k] },
}

const { recipes, getRecipeById } = await import('../src/data/recipes.ts')
const { loadSavedMealIds, loadShoppingList, saveShoppingList } = await import('../src/lib/storage.ts')

const ROOT = process.cwd()
let failed = 0

function pass(msg) {
  console.log(`✓ ${msg}`)
}

function fail(msg) {
  console.error(`✗ ${msg}`)
  failed++
}

function filterRecipes(category, prepTime) {
  return recipes.filter((r) => r.category === category && r.prepTime === prepTime)
}

function searchRecipes(query) {
  const q = query.toLowerCase().trim()
  return recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(q))
  )
}

// ── Recipe count & structure ──
if (recipes.length === 70) pass('70 recipes in dataset')
else fail(`Expected 70 recipes, got ${recipes.length}`)

const expectedCounts = {
  'school-lunch': 20,
  'school-snack': 15,
  breakfast: 10,
  'family-dinner': 15,
  'protein-snack': 10,
}
for (const [cat, count] of Object.entries(expectedCounts)) {
  const n = recipes.filter((r) => r.category === cat).length
  if (n === count) pass(`${cat}: ${count} recipes`)
  else fail(`${cat}: expected ${count}, got ${n}`)
}

const ids = recipes.map((r) => r.id)
if (ids.length === new Set(ids).size) pass('All recipe IDs unique')
else fail('Duplicate recipe IDs found')

const names = recipes.map((r) => r.name.toLowerCase())
const dupNames = names.filter((n, i) => names.indexOf(n) !== i)
if (dupNames.length === 0) pass('All recipe names unique')
else fail(`Duplicate names: ${[...new Set(dupNames)].join(', ')}`)

for (const r of recipes) {
  if (!r.name || !r.category || !r.image) fail(`${r.id}: missing required fields`)
  if (!r.ingredients.length) fail(`${r.id}: no ingredients`)
  if (!r.instructions.length) fail(`${r.id}: no instructions`)
  if (!r.tags.length) fail(`${r.id}: no tags`)
  if (![5, 10, 20, 35].includes(r.prepTime)) fail(`${r.id}: invalid prepTime ${r.prepTime}`)
  if (!['Easy', 'Medium'].includes(r.difficulty)) fail(`${r.id}: invalid difficulty`)
  for (const ing of r.ingredients) {
    if (!ing.name) fail(`${r.id}: ingredient missing name`)
    if (!ing.quantity) fail(`${r.id}: ingredient "${ing.name}" missing quantity`)
  }
  for (const step of r.instructions) {
    if (step.length > 220) fail(`${r.id}: instruction too long (${step.length} chars)`)
  }
  if (getRecipeById(r.id)?.id !== r.id) fail(`${r.id}: getRecipeById failed`)
}

// ── Local images ──
const imagePaths = new Set(recipes.map((r) => r.image))
for (const img of imagePaths) {
  const file = join(ROOT, 'public', img.replace(/^\//, ''))
  if (existsSync(file)) pass(`Image exists: ${img}`)
  else fail(`Missing image: ${img}`)
}

const categories = Object.keys(expectedCounts)
for (const cat of categories) {
  const p = join(ROOT, 'public', 'images', 'categories', `${cat}.jpg`)
  if (existsSync(p)) pass(`Category image: ${cat}`)
  else fail(`Missing category image: ${cat}`)
}

if (existsSync(join(ROOT, 'public', 'images', 'placeholder.svg'))) {
  pass('Placeholder image exists')
} else fail('Missing placeholder.svg')

// ── Filtering ──
const times = [5, 10, 20, 35]
let populatedCombos = 0
for (const cat of categories) {
  for (const t of times) {
    const pool = filterRecipes(cat, t)
    if (pool.length >= 3) populatedCombos++
  }
}
pass(`Category/time combos with 3+ recipes: ${populatedCombos}/${categories.length * times.length}`)

const searchResult = searchRecipes('chicken')
if (searchResult.length > 0) pass(`Search works (${searchResult.length} chicken results)`)
else fail('Search returned no results for "chicken"')

// Every recipe reachable by id
for (const r of recipes) {
  if (!getRecipeById(r.id)) fail(`Recipe page would 404: ${r.id}`)
}
pass('All 70 recipe pages resolvable by ID')

// ── Storage persistence ──
localStorage.setItem('hfmp_saved_meals', JSON.stringify(['sl-01', 'bf-01']))
const loaded = loadSavedMealIds()
if (loaded.length === 2 && loaded.includes('sl-01')) pass('Saved meals localStorage round-trip')
else fail('Saved meals localStorage round-trip failed')

const shopItems = [{ id: 't1', name: 'eggs', quantity: '2', checked: false }]
saveShoppingList(shopItems)
const loadedShop = loadShoppingList()
if (loadedShop.length === 1 && loadedShop[0].name === 'eggs') pass('Shopping list localStorage round-trip')
else fail('Shopping list localStorage round-trip failed')

// ── PWA build artifacts ──
const distFiles = ['dist/index.html', 'dist/sw.js', 'dist/registerSW.js', 'dist/manifest.webmanifest']
for (const f of distFiles) {
  if (existsSync(join(ROOT, f))) pass(`Build artifact: ${f}`)
  else fail(`Missing build artifact: ${f}`)
}

if (existsSync(join(ROOT, 'dist/index.html'))) {
  const html = readFileSync(join(ROOT, 'dist/index.html'), 'utf8')
  if (html.includes('registerSW.js')) pass('Service worker registration in index.html')
  else fail('Service worker registration missing from index.html')
  if (html.includes('manifest.webmanifest')) pass('Web manifest linked in index.html')
  else fail('Web manifest missing from index.html')
}

if (existsSync(join(ROOT, 'dist/sw.js'))) {
  const sw = readFileSync(join(ROOT, 'dist/sw.js'), 'utf8')
  if (sw.includes('precacheAndRoute')) pass('Service worker precaching configured')
  else fail('Service worker missing precacheAndRoute')
  if (sw.includes('index.html')) pass('Service worker precaches app shell')
  else fail('Service worker missing index.html precache')
  if (sw.includes('NavigationRoute') || sw.includes('createHandlerBoundToURL')) {
    pass('Service worker SPA offline navigation configured')
  } else fail('Service worker missing SPA navigation fallback')
  const imgCount = (sw.match(/images\/recipes/g) || []).length
  if (imgCount >= 19) pass(`Service worker precaches recipe images (${imgCount} refs)`)
  else fail(`Service worker missing recipe images (${imgCount} refs)`)
}

const deployFiles = [
  'netlify.toml',
  'vercel.json',
  'staticwebapp.config.json',
  'public/_redirects',
]
for (const f of deployFiles) {
  if (existsSync(join(ROOT, f))) pass(`Deployment config: ${f}`)
  else fail(`Missing deployment config: ${f}`)
}

const pwaIcons = ['public/pwa-192.png', 'public/pwa-512.png', 'public/apple-touch-icon.png']
for (const f of pwaIcons) {
  if (existsSync(join(ROOT, f))) pass(`PWA icon: ${f}`)
  else fail(`Missing PWA icon: ${f}`)
}

if (existsSync(join(ROOT, 'dist/manifest.webmanifest'))) {
  const manifest = JSON.parse(readFileSync(join(ROOT, 'dist/manifest.webmanifest'), 'utf8'))
  if (manifest.display === 'standalone') pass('Manifest display: standalone')
  else fail('Manifest missing standalone display')
  const hasPng = manifest.icons?.some((i) => i.type === 'image/png' && i.sizes === '192x192')
  if (hasPng) pass('Manifest includes 192x192 PNG icon (installable)')
  else fail('Manifest missing 192x192 PNG icon')
}

console.log('')
if (failed === 0) {
  console.log('All MVP checks passed.')
  process.exit(0)
} else {
  console.error(`${failed} check(s) failed.`)
  process.exit(1)
}
