import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
// Publish only runtime files. Keep source sketches, ZIPs, tests and tooling in Git.
const runtimeFiles = ['index.html', 'styles.css', 'app.js', 'data.js', 'domain.js'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of runtimeFiles) await cp(resolve(root, name), resolve(output, name));
await cp(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });
await cp(resolve(root, 'THIRD_PARTY_NOTICES.md'), resolve(output, 'THIRD_PARTY_NOTICES.md'));
await writeFile(resolve(output, '.nojekyll'), '');
await writeFile(resolve(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

// Catch a missing entry point before the deployment artifact is uploaded.
const html = await readFile(resolve(output, 'index.html'), 'utf8');
if (!html.includes('src="app.js"') || !html.includes('href="styles.css"')) throw new Error('Missing prototype entry points.');
console.log('Static prototype prepared in dist/.');
