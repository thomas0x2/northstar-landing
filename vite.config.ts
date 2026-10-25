import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // One HTML entry per page; each is served at its folder path (e.g. /vision/).
    rollupOptions: {
      input: {
        main: "index.html",
        vision: "vision/index.html",
      },
    },
  },
});
