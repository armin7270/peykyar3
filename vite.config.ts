import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // تغییر مهم برای GitHub Pages:
  // استفاده از './' باعث می‌شود فایل‌ها به صورت نسبی آدرس‌دهی شوند
  // این کار باعث می‌شود سایت هم در دامنه اصلی و هم در ساب‌فولدر (نام مخزن) کار کند.
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});