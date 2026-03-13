#!/bin/bash

set -e

echo "Starting the publish process..."

if [ -f .env ]; then
  echo "Loading environment variables from .env..."
  set -a; source .env; set +a
else
  echo "No .env file found. Ensure NODE_AUTH_TOKEN is otherwise exported!"
fi

echo "Building the components library..."
pnpm run build

echo "Publishing to npm registry..."

export NPM_CONFIG_USERCONFIG="$(pwd)/.npmrc"

pnpm publish --access public --no-git-checks

echo "Successfully published!"