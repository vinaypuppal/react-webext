// generate stub index.html files for dev entry
import fs from "fs-extra";
import { resolve } from "path";

const port = parseInt(process.env.PORT || "") || 3303;
const r = (...args: string[]) => resolve(__dirname, "..", ...args);

const views = ["popup"];

async function run() {
  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`));
    let data = await fs.readFile(r(`src/views/${view}/index.html`), "utf-8");
    data = data.replace('"./index.tsx"', `"http://localhost:${port}/${view}/index.tsx"`);
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, "utf-8");
    // eslint-disable-next-line no-console
    console.log(`✅ stub ${view}`);
  }
}

run();
