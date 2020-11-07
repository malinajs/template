# Malina.js template

This template for new Malina.js web-application.

# Developing

```
npm run dev
```

... and open browser on [http://localhost:7000].

Edit files in `src` directory or put you static files in `public`. Web-application opened in development mode will be reloaded on each change.

# Deploy

Run command below to build your web-application into optimized buundle:

```
npm run build
```

Then upload content from the `public` directory on any static files hosting like Github Pages or any shared hosting.

Or you can run `npm run start` to launch your app in the Node environment.

# Configuration

You may set config for each part of the template by config files in the app root directory:

* `malina.config.js` - [Malina.js](https://malinajs.github.io/docs/#compile-options) compiler configuration.
* `esbuild.config.js` - options for [ESBuild](https://esbuild.github.io/api/) bundler.
* `derver.config.js` - configuration for [Derver](https://www.npmjs.com/package/derver) web-server.

## Example

If you going to use plugins for ESBuild in the `esbuild.config.js` you must add `malina-esbuild` plugin also:

```js
// esbuild.config.js

const {malinaPlugin} = require('malinajs/malina-esbuild');

module.exports = {
    plugins: [
        ... ,   // some of your plugins
        malinaPlugin()
    ]
}
```