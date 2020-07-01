
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import malinaRollup from './malina-rollup'

const host = process.env.DOCKER?'0.0.0.0':'127.0.0.1'
const watch = !!process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        file: 'src/public/bundle.js',
        format: 'iife'
    },
    plugins: [
        malinaRollup(),
        watch && serve({contentBase: 'src/public', port: 7000, host: host}),
        watch && livereload({watch: 'src/public'})
    ],
    watch: {
        clearScreen: false
    }
}
