import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const recipeDir = join(root, 'public', 'images', 'recipes')
const categoryDir = join(root, 'public', 'images', 'categories')

const recipeImages = {
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  bowl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80',
  breakfast: 'https://images.unsplash.com/photo-1494859802809-d06969a497ce?w=800&q=80',
  dinner: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
  wrap: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80',
  pasta: 'https://images.unsplash.com/photo-1563379926893-7f5d433baef8?w=800&q=80',
  chicken: 'https://images.unsplash.com/photo-1594221708779-94832f432031?w=800&q=80',
  snack: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  yogurt: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
  eggs: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80',
  stirfry: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=800&q=80',
  tacos: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
  oats: 'https://images.unsplash.com/photo-1482049015728-d99d4070b6d9?w=800&q=80',
  fish: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
  rice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
  veggies: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
  protein: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  burrito: 'https://images.unsplash.com/photo-1626700051175-681801276579?w=800&q=80',
  skillet: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
}

const categoryImages = {
  'school-lunch': 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&q=80',
  'school-snack': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
  breakfast: 'https://images.unsplash.com/photo-1494859802809-d06969a497ce?w=800&q=80',
  'family-dinner': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80',
  'protein-snack': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(dest, buf)
}

await mkdir(recipeDir, { recursive: true })
await mkdir(categoryDir, { recursive: true })

for (const [name, url] of Object.entries(recipeImages)) {
  const dest = join(recipeDir, `${name}.jpg`)
  if (existsSync(dest)) {
    console.log(`· recipes/${name}.jpg (exists)`)
    continue
  }
  try {
    await download(url, dest)
    console.log(`✓ recipes/${name}.jpg`)
  } catch (e) {
    console.warn(`✗ recipes/${name}.jpg — ${e.message}`)
  }
}

for (const [name, url] of Object.entries(categoryImages)) {
  const dest = join(categoryDir, `${name}.jpg`)
  if (existsSync(dest)) {
    console.log(`· categories/${name}.jpg (exists)`)
    continue
  }
  try {
    await download(url, dest)
    console.log(`✓ categories/${name}.jpg`)
  } catch (e) {
    console.warn(`✗ categories/${name}.jpg — ${e.message}`)
  }
}

console.log('Done.')
