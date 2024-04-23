/// <reference types="vitest" />
import { defineConfig } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./resources/ts"),
      "@auth": path.resolve(__dirname, "./resources/ts/modules/auth"),
      "@transactions": path.resolve(
        __dirname,
        "./resources/ts/modules/transactions"
      ),
      "@users": path.resolve(__dirname, "./resources/ts/modules/users"),
      "@admins": path.resolve(__dirname, "./resources/ts/modules/admins"),
    },
  },

  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/ts/main.ts"],
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          // The Vue plugin will re-write asset URLs, when referenced
          // in Single File Components, to point to the Laravel web
          // server. Setting this to `null` allows the Laravel plugin
          // to instead re-write asset URLs to point to the Vite
          // server instead.
          base: null,

          // The Vue plugin will parse absolute URLs and treat them
          // as absolute paths to files on disk. Setting this to
          // `false` will leave absolute URLs un-touched so they can
          // reference assets in the public directory as expected.
          includeAbsolute: false,
        },
      },
    }),
    sentryVitePlugin({
      org: "coderfox",
      project: "turno",
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["tests/Vue/setup.ts"],
  },
  build: {
    sourcemap: true,
  },
});
