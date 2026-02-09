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
