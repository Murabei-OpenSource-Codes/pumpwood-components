# Pumpwood UI Components

A scalable, accessible, and customizable UI library built with React, Tailwind CSS 4, and Storybook.

## Installation

Install the package using pnpm (or npm/yarn):

```bash
pnpm install pumpwood-ui-components
```

## Setup

### Import CSS

Add the following to your `tailwind.config.ts` file:

```tsx
module.exports = {
	presets: [
		require("pumpwood-ui-components/tailwind.config")
	],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./node_modules/pumpwood-ui-components/**/*.{js,ts,jsx,tsx,mdx}",
	],
  ...
}
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

This library uses the `` prefix for all Tailwind utility classes to avoid conflicts with your application's styles. When overriding styles via `className`, ensure you use valid Tailwind utilities (optionally prefixed if you configured your own Tailwind to match, but standard utilities work if your app has its own Tailwind config).

## Components

The library exports a variety of components including:

- **Button**: Interactive buttons with various variants.
- **Sidebar**: Composable sidebar navigation.
- **Table**: Data tables.
- **Card**: Content containers.
-And many more.

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
