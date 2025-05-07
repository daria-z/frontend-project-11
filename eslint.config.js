import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules/**", "dist/**", "src/dist/**", "__fixtures__/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["vite.config.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        __dirname: "readonly",
      },
    },
  },
]);
