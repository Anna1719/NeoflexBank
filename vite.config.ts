import { defineConfig } from "vitest/config";
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
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/setupTests.ts",
    alias: {
      '\\.module\\.scss$': './__mocks__/styleMock.ts',
    },
  },
})
