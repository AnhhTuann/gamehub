<div align="center">

# 👾 GameHub

**A Premium Video Game E-Commerce Platform with Modern Retro Dracula Aesthetics**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](#)

![GameHub Preview](./docs/preview.png)

</div>

---

## 🚀 Key Features

- **🎮 Dynamic Storefront:** Immerse yourself in a catalog of over 800,000+ games, powered by the RAWG API with real-time search, robust filtering, and stunning responsive grid layouts.
- **🛒 Global Shopping Cart:** Flawless global state management powered by Zustand. Instantly add games, manage your inventory, and calculate subtotals from anywhere in the app—zero prop drilling required.
- **💳 Secure Checkout Flow:** A seamless and secure mock transaction process featuring smart form validation, loading state telemetry, and a beautiful success modal.
- **⚡ Daily Deals:** Real-time discounted specials fetching via the CheapShark API. Features built-in offline fallback caching and graceful degradation to protect against strict API rate limits.
- **🔐 Admin Dashboard:** Comprehensive system telemetry, revenue charts, and Role-Based Access Control (RBAC) for staff and inventory management.

---

## 🛠 Tech Stack Breakdown

**Frontend**
- **Core:** React (Vite)
- **Styling:** Tailwind CSS (Modern Retro Dracula Theme)
- **State Management:** Zustand
- **Data Fetching:** Apollo Client
- **Routing:** React Router

**Backend**
- **Runtime:** Node.js
- **API Engine:** GraphQL via Apollo Server
- **Database & ORM:** PostgreSQL with Prisma ORM

**DevOps & Infrastructure**
- **Containerization:** Docker & Docker Compose
- **Reverse Proxy:** Nginx (Multi-stage build)

---

## 🕹 Getting Started (Local Deployment)

Ready to insert coin? Follow these instructions to get your local environment up and running in minutes.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/GameHub.git
cd GameHub
```

### 2. Environment Variables
Create a `.env` file in the root directory and configure the following required variables:
```env
# Frontend
VITE_RAWG_API_KEY=your_rawg_api_key_here

# Backend
DATABASE_URL=postgresql://user:password@db:5432/gamehub
JWT_SECRET=your_super_secret_jwt_key
PORT=4000
```

### 3. One-Click Deployment
Spin up the entire full-stack environment (Frontend, Backend, and PostgreSQL Database) with a single Docker command:
```bash
docker-compose up -d --build
```

### 4. Access the Application
Once the containers are successfully running, you can access the services at:
- **Frontend App:** [http://localhost:3000](http://localhost:3000)
- **Backend / GraphQL Playground:** [http://localhost:4000](http://localhost:4000)

---

## 👾 Author

**Tuấn**  
*Frontend Engineer / Kỹ sư Công nghệ thông tin*

---
<div align="center">
  <sub>Built with 💜 and 16-bit magic.</sub>
</div>
