#!/bin/bash

cd /app
mkdir -p /app/src

if [ ! -f "/app/src/main.js" ]; then
    cp /app/src_orig/* /app/src/
fi

DOCKER=1 npm run dev
