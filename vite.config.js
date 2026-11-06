import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("pdf-lib")) {
              return "vendor-pdf";
            }
            if (id.includes("page-flip")) {
              return "vendor-pageflip";
            }
            if (id.includes("vue") || id.includes("vue-router")) {
              return "vendor-core";
            }
            return "vendor-misc";
          }
        },
      },
    },
  },
});
