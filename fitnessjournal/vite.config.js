import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'The Fitbook',
        short_name: 'TFB',
        start_url: '/',
        icons: [
          {
            src: '/assets/TheFitbook.png',
            sizes: '500x500',
            type: 'image/png',
          },
        ],
        background_color: '#c65d42',
        display: 'standalone',
        theme_color: '#c65d42',
      },
      devOptions: {
        enabled: true,
      }
    }),
  ],
})

// Notes:
// instead of creating multiple nested routes to create exercises/add exercises,
// I'll restucture like this:
// - main dashboard/new workout screen with start new workout/add exercises/previous workouts,
// - create new exercise page
// - create new category page
// 