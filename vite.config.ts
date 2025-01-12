import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import dns from 'dns'

dns.setDefaultResultOrder('verbatim');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { outDir: "build" },
  base: "/",
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    port: 3000,
  },
})
