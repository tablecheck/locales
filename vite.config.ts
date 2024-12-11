import { basename, resolve } from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig(({ command }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        basename(entryName, 'tsx') + (format === 'es' ? '.js' : '.cjs'),
    },
  },
  define:
    command === 'build'
      ? {
          'import.meta.vitest': 'undefined',
        }
      : undefined,
  test: {
    includeSource: ['src/**/*.{ts,tsx}'],
  },
}));
