import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "Certael-Website";
const isProjectPages = repository !== "violetweather.github.io";

export default defineConfig({
  site: "https://violetweather.github.io",
  base: isProjectPages ? `/${repository}` : "/",
  trailingSlash: "always",
  integrations: [react(), sitemap()],
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
