/** @type {import('tailwindcss').Config} */

import { defineConfig } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};
