import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(), 
    tailwindcss(),
    analyzer({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
      openAnalyzer: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Router
          'router': ['react-router-dom'],
          
          // Charts and visualization
          'charts': ['recharts'],
          
          // PDF generation (large library)
          'pdf': ['jspdf'],
          
          // Canvas manipulation (large library)
          'canvas': ['html2canvas-pro'],
          
          // UI components
          'ui': ['lucide-react', 'clsx', 'tailwind-merge'],
          
          // Utilities
          'utils': ['zod', 'zustand'],
          
          // External services
          'services': ['@supabase/supabase-js', '@stripe/stripe-js'],
          
          // Monitoring
          'monitoring': ['@sentry/react', 'web-vitals'],
        },
      },
    },
    chunkSizeWarningLimit: 200000, // 200KB
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
