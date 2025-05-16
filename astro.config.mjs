// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";
import clerk from "@clerk/astro";
import { dark } from "@clerk/themes";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    clerk({
      appearance: {
        baseTheme: dark,
      },
    }),
  ],
  adapter: netlify(),
});
