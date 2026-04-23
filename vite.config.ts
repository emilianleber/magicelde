import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return;
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-')) return 'recharts';
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('jspdf') || id.includes('html2canvas')) return 'pdf';
          if (id.includes('@radix-ui')) return 'radix-ui';
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('react-router') || id.includes('scheduler')) return 'react-vendor';
        },
      },
    },
  },
}));
