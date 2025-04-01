import { build } from "esbuild"

const sharedConfig = {
  entryPoints: ["src/index.ts"], // Change to your main file
  bundle: true,
  minify: true,
  sourcemap: true,
  target: "esnext",
  external: ["react"], // Add other peer dependencies if needed
}

Promise.all([
  build({ ...sharedConfig, format: "esm", outfile: "dist/index.mjs" }),
  build({ ...sharedConfig, format: "cjs", outfile: "dist/index.cjs" }),
]).catch(() => process.exit(1))
