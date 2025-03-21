import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import tailwindcss from '@tailwindcss/vite';
import type {AstroIntegration} from 'astro';

import svelte from '@astrojs/svelte';
import vendor from '@yatoday/astro-ui/vendor-config';
import {locales, defaultLocale} from './src/i18n/ui.ts';
import path from "path";
import {fileURLToPath} from "url";

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const hasExternalScripts = false;

const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: 'static',
  i18n: {
    defaultLocale: defaultLocale,
    locales: Object.keys(locales),
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    mdx(),
    icon({
      include: {
        tabler: ['*'],
      },
      iconDir: 'src/assets/icons',
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: {forward: ['dataLayer.push']},
      })
    ),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    svelte(),
    vendor({
      config: './src/config.yaml',
    }),
  ],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    ssr: {
      noExternal: ['@yatoday/astro-ui'],
    }
  },
});
