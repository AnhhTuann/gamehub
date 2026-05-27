# OmniWear Backend

This directory contains the backend source code for the OmniWear e-commerce platform. It provides a robust, scalable GraphQL API that handles all business logic, data persistence, and authentication for both the web storefront and the desktop application.

## Directory Structure

```
backend/
├── prisma/                 # Database schema and migrations
│   └── schema.prisma       # Prisma models definition (User, Product, Order, etc.)
├── src/
│   ├── index.js            # Entry point for the Express server and Apollo Server setup
│   ├── graphql/            # GraphQL specific configurations
│   │   ├── schema.js       # GraphQL TypeDefs (Queries, Mutations, Types)
│   │   └── resolvers.js    # GraphQL Resolvers (Controllers mapping requests to services)
│   └── services/           # Business Logic Layer
│       ├── authService.js  # JWT generation, password hashing, user validation
│       ├── cartService.js  # Cart manipulation (add/remove items)
│       ├── orderService.js # Checkout logic and Prisma Transactions
│       └── productService.js # Product CRUD operations
├── .env                    # Environment variables (DB Connection, JWT Secret)
└── package.json            # Dependencies and scripts
```

## Packages Used

- **`express`**: Fast, unopinionated, minimalist web framework for Node.js. Used as the base HTTP server.
- **`apollo-server-express`**: The Apollo Server integration for Express. It handles incoming GraphQL requests, parses them, and executes the appropriate resolvers.
- **`graphql`**: The core GraphQL implementation used alongside Apollo Server.
- **`@prisma/client`**: Auto-generated query builder used to interact with the PostgreSQL database. Provides type-safe database access.
- **`bcrypt`**: Used to securely hash user passwords before storing them in the database, and to compare hashes during login.
- **`jsonwebtoken`**: Used to generate and verify JSON Web Tokens (JWT) for stateless user authentication.
- **`dotenv`**: Loads environment variables from a `.env` file into `process.env`.
- **`nodemon`** (dev dependency): Automatically restarts the node application when file changes in the directory are detected.

## How It Works (Mechanism)

1. **Server Initialization**: `src/index.js` initializes an Express application and attaches an Apollo Server instance to the `/graphql` endpoint.
2. **Request Flow**: 
   - A client (Frontend or WinForms) sends a POST request with a GraphQL query/mutation to `http://localhost:4000/graphql`.
   - The request includes an `Authorization` header with a JWT (if the user is logged in).
   - Apollo Server's `context` function intercepts the request, verifies the JWT using `jsonwebtoken`, and attaches the decoded `user` object to the GraphQL context.
3. **Resolvers (Controllers)**: The request is routed to the corresponding function in `src/graphql/resolvers.js`. The resolver extracts arguments and the user context, then delegates the heavy lifting to the Service Layer.
4. **Service Layer (Business Logic)**: Classes in `src/services/` execute the actual business rules (e.g., checking if inventory is sufficient, calculating totals, verifying passwords).
5. **Database Interaction**: The Service Layer uses `@prisma/client` to execute queries or `$transaction`s against the PostgreSQL database securely. The data is retrieved, mapped, and returned back up the chain to the client.
