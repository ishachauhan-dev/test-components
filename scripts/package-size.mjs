
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { gzipSync } from "node:zlib";

const DIST_DIR = "dist";
const OUTPUT_FILE = "PACKAGE-SIZE.md";

function getFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    return entry.isDirectory()
      ? getFiles(fullPath)
      : [fullPath];
  });
}

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

const files = getFiles(DIST_DIR).map((file) => {
  const content = readFileSync(file);

  return {
    name: relative(DIST_DIR, file),
    size: statSync(file).size,
    gzip: gzipSync(content).length,
  };
});

files.sort((a, b) => b.size - a.size);

const totalSize = files.reduce((sum, file) => sum + file.size, 0);
const totalGzip = files.reduce((sum, file) => sum + file.gzip, 0);

const rows = files.map(
  (file) =>
    `| \`${file.name}\` | ${formatSize(file.size)} | ${formatSize(file.gzip)} |`
);

const report = `# Bundle Size Report

Generated from the \`dist/\` directory.

| File | Original Size | Gzip Size |
|---|---:|---:|
${rows.join("\n")}
| **Total** | **${formatSize(totalSize)}** | **${formatSize(totalGzip)}** |

> Gzip sizes are estimates of compressed file sizes, not exact browser transfer sizes.
`;

writeFileSync(OUTPUT_FILE, report);

console.log(`Report generated: ${OUTPUT_FILE}`);
