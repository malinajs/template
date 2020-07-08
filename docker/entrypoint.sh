#!/bin/bash

if [ ! -f "/app/package.json" ]; then
    mkdir -p /app/init
    cd /app/init
    npx degit malinajs/template
    if [ ! -f "/app/src/main.js" ]; then
        cd /app/init/src
        mkdir -p /app/src
        cp -r ./* /app/src/
    fi
    rm /app/init/src -r
    cd /app/init
    mv ./* /app
    cd /app
    npm install
fi

cd /app
DOCKER=1 npm run dev
