import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the repo under /<repo-name>/, so the base path
// must match the repository name. Change it if you rename the repo.
export default defineConfig({
  plugins: [react()],
  base: "/immoradar-prototyp/",
});
