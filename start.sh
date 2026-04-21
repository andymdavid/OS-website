#!/bin/sh
# Start the API server in the background
node /app/server/index.js &
# Start nginx in the foreground
nginx -g 'daemon off;'
