import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  server: {
    port: 8080,
    hot: true,
  },
});
