import { defineConfig } from 'jotai-scripts';

export default defineConfig({ entry: ['src/bin.ts', 'src/index.ts'], clean: true, dts: true, splitting: true });
