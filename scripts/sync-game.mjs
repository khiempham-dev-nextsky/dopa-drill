import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'app');
const target = path.join(root, 'public', 'game');
const nextFiles = new Set(['api', 'globals.css', 'layout.jsx', 'page.jsx', 'pwa-register.jsx']);

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
for (const entry of await readdir(source, { withFileTypes: true })) {
  if (nextFiles.has(entry.name)) continue;
  await cp(path.join(source, entry.name), path.join(target, entry.name), { recursive: true });
}
console.log(`synced ${source} -> ${target}`);
