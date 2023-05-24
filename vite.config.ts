import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteImagemin()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-router-dom', 'react-dom'],
          antd: ['antd'],
          antDesignIcons: ['@ant-design/icons'],
          cssinjs: ['@ant-design/cssinjs'],
          dateFns: ['date-fns'],
          reactInfiniteScrollComponent: ['react-infinite-scroll-component'],
          reactToastify: ['react-toastify'],
          redux: ['redux', 'react-redux', '@reduxjs/toolkit', 'redux-persist'],
        },
      },
    },
  },
});
