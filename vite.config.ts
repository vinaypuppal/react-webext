import { resolve } from "path";
import { defineConfig } from "vite";

const port = parseInt(process.env.PORT || "") || 3303;
const r = (...args: string[]) => resolve(__dirname, ...args);

export default defineConfig(({ command }) => {
  return {
    root: r("src/views"),
    base: command === "serve" ? `http://localhost:${port}/` : undefined,
    server: {
      port,
      hmr: {
        host: "localhost",
      },
    },
    build: {
      outDir: r("extension/dist"),
      emptyOutDir: false,
      rollupOptions: {
        input: {
          popup: r("src/views/popup/index.html"),
        },
      },
    },
    plugins: [
      // rewrite assets to use relative path
      {
        name: "assets-rewrite",
        enforce: "post",
        apply: "build",
        transformIndexHtml(html) {
          return html.replace(/"\/assets\//g, '"../assets/');
        },
      },
    ],
  };
});
