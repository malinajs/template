
import nodeResolve from '@rollup/plugin-node-resolve';
import malinaRollup from 'malinajs/malina-rollup.js';
import { derver } from 'derver/rollup-plugin';
import css from 'rollup-plugin-css-only';
import terser from "@rollup/plugin-terser";

const DEV = !!process.env.ROLLUP_WATCH;
const cssInJS = true;

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve(),
    malinaRollup({
      css: cssInJS,
      plugins: []
    }),
    !cssInJS && css({ output: 'bundle.css' }),
    DEV && derver(),
    !DEV && terser()
  ],
  watch: {
    clearScreen: false
  }
}
