# OmniWear Storefront & Admin Web App

This directory contains the Next.js web application for OmniWear. It serves a dual purpose: it acts as the customer-facing storefront (e-commerce site) and the internal Admin Dashboard for managing the platform.

## Directory Structure

```
storefront/
├── src/
│   ├── app/
│   │   ├── (storefront)/         # Route group for customer-facing pages
│   │   │   ├── page.js           # Homepage
│   │   │   ├── layout.js         # Shared layout (Navbar, Footer)
│   │   │   └── products/         # Product listing and details
│   │   ├── (admin)/              # Route group for admin dashboard
│   │   │   ├── layout.js         # Admin layout (Sidebar)
│   │   │   └── dashboard/        # Dashboard metrics and management tables
│   │   ├── globals.css           # Global design system (CSS variables, utilities)
│   │   └── layout.js             # Root HTML/Body layout
│   └── components/               # Reusable React components
│       ├── ui/                   # Generic elements (Button, Input, Card)
│       ├── storefront/           # Storefront specific (Navbar, ProductCard, HeroBanner)
│       └── admin/                # Admin specific (Sidebar, StatCard, ChartMock)
└── package.json
```

## Packages Used

- **`next`**: The React framework used to build the application. It provides the App Router (`src/app`), Server-Side Rendering (SSR), and Static Site Generation (SSG) capabilities out of the box.
- **`react` & `react-dom`**: The core libraries for building user interfaces using components and managing DOM updates efficiently.

## How It Works (Mechanism)

1. **Next.js App Router**: The application utilizes the new Next.js App Router paradigm. Folders inside `src/app` define the routing structure.
2. **Route Groups**: Folders with parentheses like `(storefront)` and `(admin)` are "Route Groups". They do not affect the URL path but allow us to share different layout architectures (e.g., a Sidebar for admin, but a top Navbar for the storefront) without clashing.
3. **Server vs Client Components**: 
   - By default, components in the `app` directory are **Server Components**. They are rendered on the Node.js server, which improves SEO and performance by sending less JavaScript to the browser.
   - Components that require browser interactivity (like `useState`, `onClick`, `onMouseOver`) are explicitly marked as **Client Components** using the `'use client';` directive at the top of the file (e.g., `Sidebar.jsx`, `Products/page.js`).
4. **Component-Driven Architecture**: The UI is built by composing small, isolated functions in the `src/components/` directory. For example, the `Home` page doesn't contain raw HTML for buttons; it imports `<Button>` and `<ProductCard>` components. This ensures visual consistency and makes maintenance easier.
5. **Styling**: We utilize a custom CSS variable system in `globals.css` to manage themes, colors, and responsive design natively without relying on heavy external CSS frameworks.
