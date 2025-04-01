import { basename, resolve } from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig(({ command }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format, entryName) =>
        basename(entryName, 'tsx') + (format === 'es' ? '.js' : '.cjs'),
    },
    target: 'es2019',
    rollupOptions: {
      output: [
        {
          format: 'es',
          preserveModules: true,
        },
      ],
    },
  },
  esbuild: {
    target: 'es2019',
    supported: {
      'nullish-coalescing': false,
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
