# Pumpwood UI Components

A scalable, accessible, and customizable UI library built with React, Tailwind CSS 4, and Storybook.

## Installation

Install the package using pnpm (or npm/yarn):

```bash
pnpm install pumpwood-ui-components
```

## Setup

The library expects `React` to be available as a global variable. In Next.js 14+ with the App Router this is not the case by default. Add the following to your `next.config.mjs` to patch it at build time:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...your existing config
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );
    return config;
  },
};

export default nextConfig;
```


## Usage

Import components directly from the package:

```tsx
import { Button } from "pumpwood-ui-components";

function MyComponent() {
  return <Button className="bg-blue-500">Click Me</Button>;
}
```

### Customized Prefix

This library uses the `pw:` prefix for all Tailwind utility classes to avoid conflicts with your application's styles. When overriding styles via `className`, use valid Tailwind utilities prefixed with `pw:` if your app is configured to match, or standard utilities if your app has its own separate Tailwind config.

## Components

The library exports a variety of components including:

- **Button**: Interactive buttons with various variants.
- **Sidebar**: Composable sidebar navigation.
- **Table**: Data tables.
- **Card**: Content containers.
- And many more.

## Building and Publishing to npm

To quickly build and publish the package to npm, we have a helper script that automates the environment variable loading, building, and publishing.

### 1. Setup Auth Token (One-time setup)

We use an authentication token rather than logging in interactively. 

Create a `.env` file at the root of the project with your npm token (this file is already in `.gitignore` so it won't be committed safely):
```ini
NODE_AUTH_TOKEN=your_npm_access_token_here
```

Your `.npmrc` file is already configured to automatically read this token.

### 2. Update Version

npm requires a new version number for every successful publish. Before publishing, bump your package version:
```bash
npm version patch  # For bug fixes (e.g., 1.0.1 -> 1.0.2)
# or
npm version minor  # For new features (e.g., 1.0.1 -> 1.1.0)
```

### 3. Run the Publish Script

Finally, make sure your dependencies are installed (e.g., `pnpm install`) and simply run the automated script:
```bash
./publish.sh
```

This script will automatically:
1. Load your `.env` token.
2. Build the project using Rollup.
3. Publish to the public npm registry.

Once the command succeeds, your new version is live on the npm registry!
