import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The site is served from the root of the custom domain (ahsanamingorsi.com),
// so base stays '/'. Only change it if the site ever moves to
// https://<user>.github.io/<repo>/ without a custom domain.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { target: 'es2022', sourcemap: false },
});
