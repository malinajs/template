
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import malina from 'malinajs/malina-rollup'

const HOST = process.env.HOST || process.env.DOCKER ? '0.0.0.0' : '127.0.0.1';
const PORT = process.env.PORT || 7000;

const dev = !!process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        file: 'src/public/bundle.js',
        format: 'iife'
    },
    plugins: [
        malina({
            hideLabel: !dev,
        }),
        resolve(),
        dev && serve({contentBase: 'src/public', host: HOST, port: PORT}),
        dev && livereload({watch: 'src/public'})
    ],
    watch: {
        clearScreen: false
    }
}
