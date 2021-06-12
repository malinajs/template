import resolve from '@rollup/plugin-node-resolve';
import derver from 'derver/rollup-plugin';
import css from 'rollup-plugin-css-only';
import { terser } from "rollup-plugin-terser";
import malina from 'malinajs/malina-rollup'
import malinaSass from 'malinajs/plugins/sass'

const DEV = !!process.env.ROLLUP_WATCH;
const cssInJS = true;

export default {
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife',
    },
    plugins: [
        malina({
            hideLabel: !DEV,
            css: cssInJS,
            plugins: [malinaSass()]
        }),
        resolve(),
        DEV && derver(),
        !cssInJS && css({ output: 'bundle.css' }),
        !DEV && terser()
    ],
    watch: {
        clearScreen: false
    }
}