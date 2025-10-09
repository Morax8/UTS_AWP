import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Setiap request yang diawali '/api' akan diteruskan ke server backend
      "/api": {
        target: "http://localhost:5000", // Alamat server Express
        changeOrigin: true,
      },
    },
  },
});

