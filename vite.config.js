import { defineConfig } from "vite";
// import path from "path";

export default defineConfig({
  // root: path.resolve(__dirname, "/"),
  // build: {
  //   outDir: 'build',
  //   assetsDir: 'assets'
  // },
  server: {
    port: 8080,
    hot: true,
  },
});
