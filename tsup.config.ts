import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
    treeshake: true,
    splitting: true,
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    minify: true,
    clean: true,
    ...options,
}));
