import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

// Notes:
// instead of creating multiple nested routes to create exercises/add exercises,
// I'll restucture like this:
// - main dashboard/new workout screen with start new workout/add exercises/previous workouts,
// - create new exercise page
// - create new category page
// 