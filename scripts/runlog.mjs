import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

function parseArgs(argv) {
  const result = { file: '', lines: [] };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--file') {
      result.file = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (arg === '--line') {
      const line = argv[index + 1] ?? '';
      result.lines.push(line);
      index += 1;
    }
  }

  return result;
}

async function main() {
  const { file, lines } = parseArgs(process.argv.slice(2));

  if (!file) {
    throw new Error('Missing --file argument.');
  }

  if (lines.length !== 5) {
    throw new Error('Exactly 5 --line arguments are required.');
  }

  const targetPath = path.resolve(process.cwd(), file);
  await mkdir(path.dirname(targetPath), { recursive: true });

  let existing = '';

  try {
    existing = await readFile(targetPath, 'utf8');
  } catch {
    existing = '';
  }

  const block = `${lines.join('\n')}\n`;
  const separator = existing.trim().length > 0 ? '\n\n' : '';

  await writeFile(targetPath, `${existing.trimEnd()}${separator}${block}`, 'utf8');
  process.stdout.write(`Run log appended to ${file}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});