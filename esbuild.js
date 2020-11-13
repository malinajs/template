const fs = require('fs/promises');
const watch = require('node-watch');
const {malinaPlugin} = require('malinajs/malina-esbuild');
const { build } = require('esbuild');

const APP_ENTRY = 'src/app/app.js';
const ELECTRON_ENTRY = 'src/electron/main.js';
const APP_DIR = 'static';
const APP_BUNDLE = 'static/js/app.js';
const ELECTRON_BUNDLE = 'static/js/electron.js';

if(process.argv.includes('--dev')){

    esbuild_app(false);
    esbuild_electron(false);

    const app = runApp();
    
    watch('src/app',{recursive: true},()=>{
        esbuild_app(false);
    });

    watch('src/electron',{recursive: true},()=>{
        esbuild_electron(false);
        app.restart();
    });
}else{
    esbuild_app(true);
    esbuild_electron(true);
}

function runApp(){
   
    const exit = () => process.exit();

    const launch = ()=>{
        const proc = require('child_process').spawn('electron',['.']);
        proc.stdout.on('data', data => console.log('[Electron]',data.toString()));
        proc.stderr.on('data', data => console.log('[Electron]',data.toString()));
        proc.on('exit', exit);
        return proc;
    }

    let proc = launch();


    process.on('SIGTERM', proc.kill);
    process.on('SIGINT', proc.kill);
    process.on('exit', proc.kill);
    

    return {
        exit: proc.kill,
        restart: ()=>{
            proc.removeListener('exit',exit);
            proc.kill();
            proc = launch();
        }
    }
}

async function esbuild_app(production){

    let options = production ? {} : {minify:false};

    options = {
        entryPoints: [APP_ENTRY],
        outfile: APP_BUNDLE,
        minify: true,
        bundle: true,
        plugins: [malinaPlugin()],
        ...options
    };

    await build(options);
}

async function esbuild_electron(production){

    let options = production ? {} : {minify:false};
    
    options = {
        entryPoints: [ELECTRON_ENTRY],
        outfile: ELECTRON_BUNDLE,
        platform: 'node',
        external:['electron'],
        format: "cjs",
        minify: true,
        bundle: true,
        ...options
    };

    await build(options);
    if(!production) await injectLivereload();
}

async function injectLivereload(){
    let code = await fs.readFile(ELECTRON_BUNDLE,'utf-8');
    code = `(function(){
        const {app} = require('electron');
        const watch = require('node-watch');
        const bwSet = new Set();
      
        app.on('browser-window-created', (e, bw) => {
          bw.on('closed', ()=>bwSet.delete(bw));
          bwSet.add(bw);
          bw.webContents.openDevTools({mode: 'detach'})
        });
      
        watch('static',{
          recursive: true,
          filter: f => f !== 'static/js/electron.js'
        },()=>{
          bwSet.forEach(bw => bw.webContents.reloadIgnoringCache())
        });
      })();
    ` + code;
    await fs.writeFile(ELECTRON_BUNDLE,code);
}