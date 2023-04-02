import { defineConfig } from 'tsup'
import path from 'path'


export default defineConfig({
  entry: ['server/server.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: path.resolve(__dirname, '../dist')
})