# test-components

A reusable React + TypeScript component library with Tailwind CSS v4 design tokens.

## Install

```bash
npm install @ishachauhan-dev/test-components
```

React 18 or 19 is required (`react` and `react-dom` are peer dependencies).

## Setup in a consumer app

### Option A — drop-in stylesheet (no Tailwind required)

Import the compiled stylesheet once in your app entry:

```ts
import '@ishachauhan-dev/test-components/styles.css';
```

This file includes the design tokens and the utilities used by the components. It does **not** include Tailwind Preflight, so it will not reset your app’s base styles.

To enable dark mode, add the `dark` class on `html` (or any ancestor):

```html
<html class="dark">
```

### Option B — Tailwind CSS v4 (recommended if you already use Tailwind)

In your CSS entry:

```css
@import 'tailwindcss';
@import '@ishachauhan-dev/test-components/theme.css';

/* Scan the published JS so component class names are generated */
@source '../node_modules/@ishachauhan-dev/test-components/dist';
```

`theme.css` defines namespaced design tokens (`--nat-*`) so they do not collide with the app’s theme. Point `@source` at `dist` — only that folder is published.

Then import components as usual. You can still import `@ishachauhan-dev/test-components/styles.css` if you want the precompiled utilities as well, but `@source` is enough when Tailwind processes your app.

## Theming

Override `--nat-*` variables in the consumer app. Components read those values through `--color-nat-*` theme keys (`bg-nat-primary`, `text-nat-foreground`, and so on).

```css
:root {
  --nat-primary: oklch(0.55 0.2 250);
  --nat-primary-foreground: oklch(0.985 0 0);
}

.dark {
  --nat-primary: oklch(0.7 0.15 250);
  --nat-primary-foreground: oklch(0.145 0.014 260);
}
```

## Usage

```tsx
import { Button } from '@ishachauhan-dev/test-components';
import '@ishachauhan-dev/test-components/styles.css';

export function Example() {
  return <Button variant="primary">Continue</Button>;
}
```

Import a single component to keep unused UI out of the app bundle:

```ts
import { Button } from '@ishachauhan-dev/test-components/button';
```

## Development

Requires Node.js 20.19+ or 22.12+ (Storybook 10 / Vite 7). Node 21 is not supported.

```bash
npm install
npm run storybook      # component docs at http://localhost:6006
npm run dev            # watch the library build
npm run typecheck
npm run lint
npm run build
```

Use the Storybook toolbar theme toggle to preview light and dark tokens.

## Adding a new component

1. Create `src/components/<ComponentName>/`:
   - `<ComponentName>.tsx` — implementation
   - `<ComponentName>.stories.tsx` — CSF3 stories with `autodocs`
2. Re-export from `src/index.ts`. Subpath imports (`@ishachauhan-dev/test-components/button`) are generated automatically from the folder name — do not add `package.json` exports.

```ts
export {
  ComponentName,
  type ComponentNameProps,
} from './components/ComponentName/ComponentName';
```

3. Use only namespaced tokens from `src/styles/theme.css` (for example `bg-nat-primary`, `text-nat-foreground`, `rounded-nat-md`). Do not hardcode colors.

## Publish

```bash
npm run build
npm publish --access public
```

`files` is set to `["dist"]`. Update the package `name` in `package.json` before publishing, and replace the LICENSE copyright placeholder.

## License

MIT

## Package Size

See the latest [Package Size Report](./PACKAGE-SIZE.md).
