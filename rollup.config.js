
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import malinaRollup from './malina-rollup'

const watch = !!process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        file: 'public/bundle.js',
        format: 'iife'
    },
    plugins: [
        malinaRollup(),
        watch && serve({contentBase: 'public', port: 7000}),
        watch && livereload({watch: 'public'})
    ],
    watch: {
        clearScreen: false
    }
}
