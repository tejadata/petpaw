# Styling Guide

Reference for styling patterns, Tailwind CSS configuration, and shadcn/ui theming in PawMatch.

---

## Stack

| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | v4 | Utility-first CSS framework |
| PostCSS | Plugin-based | Tailwind integration via `postcss.config.js` |
| tailwind-merge | v3+ | Merges conflicting Tailwind classes via `cn()` |
| clsx | — | Conditional class name joining |
| shadcn/ui | Latest | Pre-built Radix UI + Tailwind components |

---

## Configuration

### PostCSS — `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Tailwind v4 uses the native PostCSS plugin rather than a separate `tailwind.config.ts`.

### shadcn/ui — `components.json`

Configures shadcn/ui CLI for component generation:
- Style: default
- CSS variables: enabled
- Component alias: `@/components`
- Utility alias: `@/lib/utils`

---

## Global Styles — `app/globals.css`

The global stylesheet defines:
1. **Tailwind imports** — base, components, utilities
2. **CSS custom properties** — color theme variables for light/dark mode
3. **Base layer overrides** — default `border-color`, `body` background/foreground

### Theme Variables

Colors are defined as HSL values in CSS custom properties:

```css
:root {
  --background: <hsl>;
  --foreground: <hsl>;
  --card: <hsl>;
  --card-foreground: <hsl>;
  --primary: <hsl>;
  --primary-foreground: <hsl>;
  --secondary: <hsl>;
  --muted: <hsl>;
  --accent: <hsl>;
  --destructive: <hsl>;
  --border: <hsl>;
  --input: <hsl>;
  --ring: <hsl>;
  --radius: <value>;
}
```

Dark mode variables are defined in a `.dark` class.

---

## Utility Function — `cn()`

Located in `lib/utils.ts`, used throughout all components:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This merges class names intelligently, resolving Tailwind conflicts (e.g., `bg-red-500 bg-blue-500` → `bg-blue-500`).

**Usage:**
```tsx
<div className={cn("px-4 py-2", isActive && "bg-primary text-white", className)}>
```

---

## Common Patterns

### Responsive Design

The app uses mobile-first responsive breakpoints:

```
sm:  640px+     (tablets)
md:  768px+     (small laptops)
lg:  1024px+    (desktop)
xl:  1280px+    (wide desktop)
```

Common patterns:
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` — responsive grid
- `py-16 sm:py-20` — increased spacing on larger screens
- `hidden md:block` / `md:hidden` — show/hide by breakpoint
- `text-3xl sm:text-4xl lg:text-5xl` — responsive typography

### Container Pattern

```tsx
import { Container } from "@/components/layout/container";

<Container className="py-16 sm:py-20">
  {/* Page content */}
</Container>
```

Provides `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.

### Card Pattern

```tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Form Layout

Forms use React Hook Form with consistent layout:

```tsx
<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" {...register("name")} />
    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
  </div>
  <Button type="submit">Save</Button>
</form>
```

### Badge Variants

```tsx
<Badge variant="default">Active</Badge>     // Primary color
<Badge variant="secondary">Draft</Badge>    // Muted
<Badge variant="destructive">Urgent</Badge> // Red
<Badge variant="outline">Info</Badge>       // Bordered
```

---

## Color Conventions

| Use | Class | Purpose |
|---|---|---|
| Primary actions | `bg-primary text-primary-foreground` | Buttons, active states |
| Secondary elements | `bg-secondary text-secondary-foreground` | Filter tags, secondary buttons |
| Destructive actions | `bg-destructive text-destructive-foreground` | Delete buttons, error states |
| Muted text | `text-muted-foreground` | Descriptions, hints, secondary text |
| Borders | `border` | Uses `--border` variable |
| Hover states | `hover:bg-accent` | Interactive elements |

---

## Customizing Themes

1. Edit CSS variables in `app/globals.css` `:root` block
2. Colors use HSL format without `hsl()` wrapper: `240 10% 3.9%`
3. Border radius controlled by `--radius` variable
4. Dark mode: update `.dark` block with dark-theme HSL values

---

## Adding New shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Components are generated in `components/ui/` and can be customized freely. The `components.json` file controls generation paths.
