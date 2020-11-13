# Malina.js Electron template

This template for new Malina.js desktop application based on Electron

# Developing

```
npm run dev
```

Then window with application will be oppened (and Devtools window also). 

Edit files in `src/app` directory or put you static files in `static`. Application will be reloaded on each change.

Also you may change the Electron part at `src/electron`. Each change will restart the application.

# Build

Run command below to build your application:

```
npm run build
```

You will found directory with executable and libreary files in the `dist` folder. This directory may be packed by tools like `electron-installer-windows ` or other packagers.

By default you will get binary to run in the your OS and architecture. Change `build` script in the `package.json` to add other platforms and other options for [electron-packager](https://www.npmjs.com/package/electron-packager) tool.