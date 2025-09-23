import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DriveLite docs",
  description: "Docs for drivelite the supabase of file storage",
  outDir: "../public/docs",
  base: "/docs/",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],

    sidebar: [],

    socialLinks: [
      { icon: "github", link: "https://github.com/Drivelite/drivelite" },
    ],
  },
  sitemap: {
    hostname: "https://docs.drivelite.org/",
  },
});
