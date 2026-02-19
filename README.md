# Preload Navigation Demo

Demonstrates techniques for eliminating nav-bar flicker during full-page navigations in an MPA-style React app (Vite + React Router + MUI).

https://github.com/user-attachments/assets/e5844b92-3db6-4342-b601-c977d9b282a0


## The Problem

When a nav-bar link triggers a full page load (`window.location.href = ...`), the browser tears down the current document and starts fresh. The user sees a white flash while the new page's CSS, JS, and fonts download — the nav bar disappears and then re-appears, creating a jarring "flicker."

## Techniques Used

### 1. Static HTML Navbar Shell (`index.html`)

A plain HTML/CSS navbar is embedded directly in `index.html`, outside of React's render tree. Because it is raw markup with inline styles, it paints **immediately** — before any JavaScript is parsed. A small inline script marks the active link based on the current URL.

```html
<div id="static-navbar" style="view-transition-name: navbar; position: fixed; ...">
  <a href="/dashboard" class="shell-nav-btn" ...>Dashboard</a>
  ...
</div>
<script>
  // highlight the active link based on window.location.pathname
</script>
```

Once React hydrates, the `<NavBar />` component renders on top of this shell with the same dimensions and styling, making the swap invisible.

### 2. CSS View Transitions (`@view-transition`)

The cross-document View Transition API tells the browser to morph shared elements between pages instead of flashing to white.

```css
@view-transition { navigation: auto; }
::view-transition-group(navbar) { animation-duration: 0s; }
```

Both the static shell and the React `<AppBar>` share the same `view-transition-name: navbar`, so the browser treats them as one persistent element across navigations. Setting the animation duration to `0s` keeps the navbar locked in place with zero movement.

### 3. Speculation Rules (Prerender)

A `<script type="speculationrules">` block tells the browser to **prerender** target pages in the background when the user is likely to navigate to them (`"eagerness": "moderate"` — typically on hover/pointer-down).

```json
{
  "prerender": [{
    "where": { "href_matches": ["/dashboard", "/reports", "/settings", "/users"] },
    "eagerness": "moderate"
  }]
}
```

When the user clicks a link, the fully-rendered page is swapped in almost instantly because the browser has already loaded and executed its resources.

### 4. JS-Level Chunk Preloading (`onMouseEnter` / `onFocus`)

Each route exposes a `preload()` function that triggers its `import()` chunk. The `<NavBar>` calls it on hover/focus so the lazy-loaded section module is already cached by the time navigation completes.

```tsx
// routes.ts
const dashboardImport = () => import("./sections/dashboard/DashboardApp");
{ component: lazy(dashboardImport), preload: dashboardImport }

// NavBar.tsx
<Button onMouseEnter={handlePreload(route)} onFocus={handlePreload(route)} ... />
```

### 5. Suspense Skeleton Fallback

While a lazy section is still loading (e.g. on a cold first visit), `<Suspense fallback={<PageSkeleton />}>` renders a skeleton placeholder so the layout never collapses.

## How They Work Together

1. User hovers a nav link — **speculation rules** start prerendering the page; **JS preload** fetches the chunk.
2. User clicks — full navigation fires. The **View Transition API** morphs the navbar in-place instead of flashing.
3. New document loads — the **static HTML shell** paints the navbar instantly, before React boots.
4. React hydrates — the shell is seamlessly replaced by the MUI `<AppBar>`, and the preloaded chunk renders the section with no Suspense delay.

The result is a full-page navigation that feels as smooth as a client-side route change.
