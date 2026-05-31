# 🔌 GameHub GraphQL API Engine (Node.js Backend)

This directory contains the robust, scalable backend server for the **GameHub** platform. It provides a GraphQL API that handles gamer authentication, game catalog management, order processing, and transactional database updates for both storefront clients and administrative desktop applications.

---

## 📂 Key Architecture & Directories

```
backend/
├── prisma/
│   ├── schema.prisma       # Prisma database models definition (User, Game, Order, etc.)
│   └── seed.js             # Seeding utility to populate hot retro game titles
├── src/
│   ├── index.js            # Entry point for Express + Apollo GraphQL server integration
│   ├── graphql/
│   │   ├── schema.js       # GraphQL TypeDefs (Queries, Mutations, game types)
│   │   └── resolvers.js    # Controllers mapping GraphQL operations to operations services
│   └── services/
│       ├── authService.js  # JWT-based gamer credentials validation
│       ├── cartService.js  # Cart cache manipulator
│       ├── orderService.js # checkout transaction, key dispatch, and inventory updates
│       └── productService.js # game CRUD database queries via Prisma Client
├── .env                    # DB connection strings & JWT keys
└── package.json            # Scripts & module dependencies
```

---

## 🛠️ Main Libraries Used

* **`express`**: Fast, lightweight web framework serving HTTP routes.
* **`apollo-server-express`**: Integrates Apollo Server into Express to parse, validate, and execute incoming GraphQL queries and mutations.
* **`@prisma/client`**: Auto-generated type-safe database query client used to write and fetch PostgreSQL records easily.
* **`bcrypt`**: Hashing library ensuring gamer passwords are encrypted securely.
* **`jsonwebtoken`**: Stateless token manager used to sign and authenticate users via request contexts.
* **`nodemon`**: Development monitor restarting the Node process on file updates.

---

## ⚙️ How It Works (The Lifecycle)

1. **Server Boot:** `src/index.js` spins up the Express server and binds Apollo Server to the `/graphql` route.
2. **Context verification:** Incoming requests with an `Authorization` header verify the user's JWT via `jsonwebtoken` and bind the `user` context payload to all queries/mutations.
3. **Resolvers delegation:** Apollo maps requests to `src/graphql/resolvers.js`, which parses arguments and triggers the proper class in `src/services/` (Business logic layer).
4. **Prisma Transaction:** Services manipulate tables and commit actions within Prisma `$transaction` blocks (ensuring keys are successfully registered or stock subtracted cleanly without database race conditions).

---

## 🚀 How to Run

### Prerequisites
* **Node.js** (v18+)
* **Docker Desktop** (for running PostgreSQL database)

### Steps
1. **Dumb Database Docker Container:**
   ```bash
   docker-compose up -d
   ```
2. **Install modules:**
   ```bash
   npm install
   ```
3. **Sync database schemas and seeds:**
   ```bash
   npx prisma db push
   npm run seed
   ```
4. **Run Server:**
   ```bash
   npm run dev
   ```
   The engine will be accessible via Apollo sandbox at `http://localhost:4000/graphql`.
