#!/bin/bash

set -e

echo "Starting the publish process..."

if [ -f .env ]; then
  echo "Loading environment variables from .env..."
  export $(grep -v '^#' .env | xargs)
else
  echo "No .env file found. Ensure NODE_AUTH_TOKEN is otherwise exported!"
fi

echo "Building the components library..."
npm run build

echo "Publishing to npm registry..."
npm publish

echo "Successfully published!"
