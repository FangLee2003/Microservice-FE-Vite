import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import dotenv from 'dotenv';

// ----------------------------------------------------------------------
dotenv.config(); // Load environment variables from .env file

export default defineConfig({
  // env: {
  //   VITE_BASE_URL: "http://localhost:9000/api",
  // },
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
// / signifies the start of a regular expression pattern.
// ^ indicates the beginning of the line in the pattern.
// . matches any character except for a newline.
// + quantifier means one or more times, so (.+) matches one or more characters.
// $1 is the first capturing group, this is (.+)