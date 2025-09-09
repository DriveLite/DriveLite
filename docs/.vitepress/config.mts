import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "DriveLite docs",
  description: "Docs for drivelite the supabase of file storage",
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],

    sidebar: [],

    socialLinks: [
      { icon: "github", link: "https://github.com/moukhtar-youssef/drivelite" },
    ],
  },
});
