import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', // Використання Terser для мінімізації
    terserOptions: {
      compress: {
        drop_console: true, // Видалення console.log
        drop_debugger: true, // Видалення debugger
      },
      mangle: {
        properties: {
          // Налаштування мінімізації властивостей об'єктів, якщо потрібно
        },
      },
      output: {
        comments: false, // Видалення коментарів
      },
    },
  },
});
