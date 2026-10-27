import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const root = import.meta.dirname;

function toKebabCase(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const componentEntries = Object.fromEntries(
  readdirSync(resolve(root, 'src/components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => [
      toKebabCase(entry.name),
      resolve(root, 'src/components', entry.name, `${entry.name}.tsx`),
    ]),
);

export default defineConfig({
  plugins: [
    react(),
    !process.env.STORYBOOK &&
      dts({
        tsconfigPath: './tsconfig.json',
        rollupTypes: true,
        exclude: ['**/*.stories.tsx', '.storybook/**'],
      }),
  ],
  build: {
    minify: true,
    sourcemap: false,
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(root, 'src/index.ts'),
        ...componentEntries,
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) =>
        `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      output: {
        banner: '"use client";',
      },
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        /^@radix-ui\//,
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
});
