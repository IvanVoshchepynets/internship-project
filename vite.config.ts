import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import compression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import { visualizer } from "rollup-plugin-visualizer";
import virtual from "vite-plugin-virtual";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
    }),
    compression({
      algorithm: "brotliCompress", 
    }),
    Inspect(),
    virtual({
      "virtual-module": `export const msg = "Hello from virtual module!"`,
    }),
    visualizer({
      filename: "stats.html",
      open: false, 
    }),
  ],
  build: {
    minify: "terser", 
  },
});
