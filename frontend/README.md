# 🌐 GameHub Storefront & Admin Portal (React Frontend)

Welcome to the frontend application for the **GameHub** ecosystem. This application serves as both the client storefront for gamers and the management portal for administrators, wrapped in a high-fidelity, customized **"Modern Retro Dracula"** design theme.

---

## 🎨 Design System & Theme Details

The styling leverages modern CSS variables and Tailwind utilities to output a gorgeous retro gaming aesthetic:
* **Backgrounds:** Deep Slate Space (`#282a36`) and Dark Midnight Sidebar (`#191a21`).
* **Accents:** Neon Purple (`#bd93f9`), Neon Pink (`#ff79c6`), Cyber Cyan (`#8be9fd`), and Sunset Orange (`#ffb86c`).
* **Status Colors:** Acid Green (`#50fa7b`) for successful transactions, active statuses, and prices; and Cyber Red (`#ff5555`) for destructive alerts, warnings, and refunds.
* **Typography:**
  * **Pixel Text:** `'Press Start 2P'` from Google Fonts for game titles, headers, and retro modal warning tags.
  * **Body Copy:** Sans-serif `'Inter'` for sidebar menus, product details, form fields, and long descriptions.

---

## 📂 Key Modules & Directory Structure

```
frontend/src/
├── components/
│   ├── common/         # Custom styled components (ProductCard)
│   ├── layout/         # CartDrawer overlay, navigation bar
│   └── shop/           # OrderSuccessModal with particle motion
├── context/
│   ├── AuthContext.tsx # Mock authentication logic and Google Login
│   └── CartContext.tsx # Context managing shopping cart lists & sums
├── pages/
│   ├── Auth.tsx        # Gaming login & registration page
│   ├── Cart.tsx        # Review selection prior to transaction
│   ├── Checkout.tsx    # Secure multi-column retro credit card details form
│   ├── CustomerPortal.tsx # User licenses activation keys & wishlist grid
│   ├── Admin.tsx       # Live Telemetry dashboard, Catalog CRUD, and Orders management
│   └── Home.tsx        # High-hype gaming homepage catalogue
└── types.ts            # Type-safe schemas (Game, CartItem, Product)
```

---

## 🚀 Quick Run Guide

### Prerequisites
* **Node.js** (v18+)

### Steps
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup environment variables:**
   The frontend communicates with rawg.io for game media. Copy `.env` to configure your key if desired:
   ```bash
   VITE_RAWG_API_KEY=your_rawg_key
   ```
3. **Execute local server:**
   ```bash
   npm run dev
   ```
   The application will be hosted locally at `http://localhost:3000`.

---

## ⚡ Key Interactivities
* **Shopping Cart Drawer:** Slides from the right with a smooth overlay backdrop blur, updating amounts automatically as products are added.
* **CD-Key Generator:** In the Admin Dashboard `/admin`, clicking **Generate Keys** on pending orders triggers an actual cryptographic generation algorithm, instantly delivering access codes to simulated players.
* **Retro Warning Dialogues:** Safe deletes and status changes prompt glowing warning popups requiring explicit confirmations before execution.
