import { basename, resolve } from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig(({ command }) => ({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format, entryName) =>
        basename(entryName, 'tsx') + (format === 'es' ? '.mjs' : '.js'),
    },
    target: ['es2015'],
    rollupOptions: {
      output: [
        {
          format: 'es',
          preserveModules: true,
        },
        {
          format: 'cjs',
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
