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
  return <Button className="pw:bg-blue-500">Click Me</Button>;
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