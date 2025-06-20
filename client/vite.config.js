import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // process.cwd() is the root of your 'client' project
  const env = loadEnv(mode, process.cwd(), '');

  // THIS IS THE TEST
  console.log("Vite loaded these environment variables:", env);

  return {
    plugins: [react()],
    // You can now access the variables here if needed, for example:
    // define: {
    //   'process.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL)
    // }
  }
})