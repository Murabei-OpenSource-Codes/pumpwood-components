# Pumpwood UI Components

A scalable, accessible, and customizable UI library built with React, Tailwind CSS 4, and Storybook.

## Installation

Install the package using pnpm (or npm/yarn):

```bash
pnpm install pumpwood-ui-components
```

## Setup

### 1. Import CSS

Import the compiled CSS file in your application's entry point (e.g., `main.tsx`, `app.tsx`, or `_app.tsx`):

```tsx
import "pumpwood-ui-components/dist/index.css";
```

### 2. Wrap Application

To ensure proper styling and CSS variable scoping, wrap your application (or the part using these components) with the `.pumpwood-ui` class:

```tsx
function App() {
  return (
    <div className="pumpwood-ui">
      {/* Your app content */}
    </div>
  );
}
```

## Usage

Import components directly from the package:

```tsx
import { Button } from "pumpwood-ui-components";

function MyComponent() {
  return <Button className="pw:bg-blue-500">Click Me</Button>;
}
```

### Customized Prefix

This library uses the `pw:` prefix for all Tailwind utility classes to avoid conflicts with your application's styles. When overriding styles via `className`, ensure you use valid Tailwind utilities (optionally prefixed if you configured your own Tailwind to match, but standard utilities work if your app has its own Tailwind config).

## Components

The library exports a variety of components including:

- **Button**: Interactive buttons with various variants.
- **Sidebar**: Composable sidebar navigation.
- **Table**: Data tables.
- **Card**: Content containers.
-And many more.

## Example Usage in Another React Project

**1. Install the published package:**
```bash
npm install pumpwood-ui-components
# or
pnpm install pumpwood-ui-components
```

**2. Use the components and styles in a React file (`App.tsx`):**
```tsx
import React from "react";
// Import the components that your library exposes
import { Button, Typography, Card } from "pumpwood-ui-components";

// Ensure you import the bundled CSS for styles to be applied!
import "pumpwood-ui-components/dist/index.css"; 

export default function App() {
  return (
    <div className="pumpwood-ui">
      <Card className="p-6 m-4 max-w-sm">
        <Typography variant="h2" className="mb-4">
          Welcome to Pumpwood
        </Typography>
        <Button variant="default" onClick={() => alert("Action triggered!")}>
          Click Me!
        </Button>
      </Card>
    </div>
  );
}
```

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
