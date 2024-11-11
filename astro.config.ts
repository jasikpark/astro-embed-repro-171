import markdoc from "@astrojs/markdoc";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://v4.jasik.xyz/",
  server: {
    host: "127.0.0.1",
    port: 4242,
  },
  output: "hybrid",
  integrations: [
    react(),
    markdoc(),
    sitemap(),
    expressiveCode({
      defaultProps: {
        // Enable word wrap by default
        wrap: true,
        // Disable wrapped line indentation for terminal languages
        overridesByLang: {
          "bash,ps,sh": {
            preserveIndent: false,
          },
        },
      },
    }),
    icon({
      include: {
        // // Include only specified icons here in the bundle.
        ri: ["mastodon-fill", "twitter-fill", "github-fill"],
      },
    }),
    sentry({
      dsn: "https://ecc919f05f6e42134f723521dbd39db5@o4506782279794688.ingest.sentry.io/4506815953240064",
      sourceMapsUploadOptions: {
        project: "jasik-2-point-0",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
      // Disable the Sentry integration in dev
      enabled: !import.meta.env.DEV,
    }),
  ],
  adapter: netlify({
    imageCDN: false,
  }),
  vite: {
    css: {
      transformer: "lightningcss",
    },
  },
  prefetch: {
    prefetchAll: true,
  },
  security: {
    checkOrigin: true,
  },
  experimental: {
    env: {
      schema: {
        /** Set this in the netlify.toml deploy preview settings */
        SHOULD_BUILD_DRAFT_AND_FUTURE: envField.boolean({
          context: "server",
          access: "public",
          default: false,
        }),
      },
    },
    contentLayer: true,
  },
});
