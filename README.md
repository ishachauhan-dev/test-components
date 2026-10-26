# test-components

A reusable React + TypeScript component library with Tailwind CSS v4 design tokens, starting with `Button`.

## Install

```bash
npm install @isha_chauhan/ui
```

React 18 or 19 is required (`react` and `react-dom` are peer dependencies).

## Setup in a consumer app

### Option A — drop-in stylesheet (no Tailwind required)

Import the compiled stylesheet once in your app entry:

```ts
import '@isha_chauhan/ui/styles.css';
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
@import '@isha_chauhan/ui/theme.css';

/* Scan the published JS so component class names are generated */
@source '../node_modules/@isha_chauhan/ui/dist';
```

`theme.css` defines all design tokens (`@theme`, light/dark CSS variables, and the `dark` variant). Point `@source` at `dist` — only that folder is published.

Then import components as usual. You can still import `@isha_chauhan/ui/styles.css` if you want the precompiled utilities as well, but `@source` is enough when Tailwind processes your app.

## Usage

```tsx
import { Button } from '@isha_chauhan/ui';
import '@isha_chauhan/ui/styles.css';

export function Example() {
  return (
    <Button variant="primary" size="md" leftIcon={<MailIcon />}>
      Continue
    </Button>
  );
}
```

`Button` accepts `variant`, `size`, `loading`, `disabled`, `leftIcon`, `rightIcon`, `fullWidth`, `asChild`, `className`, and all native button attributes.

```tsx
<Button loading>Saving</Button>
<Button variant="outline" disabled>
  Disabled
</Button>
<Button asChild>
  <a href="/docs">Read the docs</a>
</Button>
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
2. Re-export from `src/index.ts` (the single public barrel):

```ts
export {
  ComponentName,
  type ComponentNameProps,
} from './components/ComponentName/ComponentName';
```

3. Use only tokens from `src/styles/theme.css` (for example `bg-primary`, `text-foreground`, `rounded-md`). Do not hardcode colors.

## Publish

```bash
npm run build
npm publish --access public
```

`files` is set to `["dist"]`. Update the package `name` in `package.json` before publishing, and replace the LICENSE copyright placeholder.

## License

MIT
