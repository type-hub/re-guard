import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  minify: true,
  clean: true,
  treeshake: true,
  // sourcemap: false,
  // keepNames: true,
})
