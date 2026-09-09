import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

/** GitHub Pages project site: https://<user>.github.io/healthy-family-meal-picker/ */
const GITHUB_PAGES_BASE = '/healthy-family-meal-picker/'

/** Override with BASE_PATH=/ for local root hosting. */
const base = process.env.BASE_PATH ?? GITHUB_PAGES_BASE

/** Path prefix without trailing slash, for Workbox URL patterns. */
const basePrefix = base === '/' ? '' : base.replace(/\/$/, '')

function denyPath(pathPattern: string): RegExp {
  return new RegExp(`^${basePrefix}${pathPattern}`)
}

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'pwa-192.png',
        'pwa-512.png',
        'apple-touch-icon.png',
        'images/**/*',
      ],
      manifest: {
        id: base,
        name: 'Healthy Family Meal Picker',
        short_name: 'Meal Picker',
        description: 'Find a healthy family meal in seconds.',
        theme_color: '#2D6A4F',
        background_color: '#FAF7F2',
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        scope: base,
        categories: ['food', 'lifestyle'],
        icons: [
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff2,webmanifest}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [
          denyPath('/assets/'),
          denyPath('/images/'),
          denyPath('/sw.js'),
          denyPath('/workbox-'),
          denyPath('/manifest.webmanifest'),
          denyPath('/favicon.svg'),
          denyPath('/pwa-'),
          denyPath('/apple-touch-icon'),
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
})
