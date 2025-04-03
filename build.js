const esbuild = require("esbuild")

const sharedConfig = {
  entryPoints: ["src/index.ts"], // Change to your main file
  bundle: true,
  minify: true,
  sourcemap: true,
  target: "esnext",
  // external: ["react"], // Add other peer dependencies if needed
}

Promise.all([
  esbuild.build({ ...sharedConfig, format: "esm", outfile: "dist/index.mjs" }),
  esbuild.build({ ...sharedConfig, format: "cjs", outfile: "dist/index.cjs" }),
]).catch(() => process.exit(1))
