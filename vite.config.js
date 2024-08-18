import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginSvgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0',
    fs: {
      strict: false
    }
  },
  plugins: [
    react(),
    vitePluginSvgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'default',
      },
    }),
  ],
  define: {
    'process.env.VITE_KEY': JSON.stringify(process.env.VITE_KEY),
  },
});
