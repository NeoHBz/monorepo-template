# Monorepo Template

A modern, high-performance monorepo template built with **Bun**, **Turborepo**, **TypeScript**, **tRPC**, and **Prisma**. This template provides a robust foundation for building scalable full-stack applications with strict type safety and efficient developer workflows.

## 🚀 Features

- **Monorepo Management**: Powered by [Turborepo](https://turbo.build/) for fast, incremental builds.
- **Package Manager**: Built on [Bun](https://bun.sh/) for lightning-fast installations and script execution.
- **Full-Stack Type Safety**: End-to-end type safety from database (Prisma) to API (tRPC) to frontend (React).
- **Backend**: Express + tRPC server running on Bun.
- **Frontend**: Vite + React application.
- **Database**: Prisma ORM with PostgreSQL support.
- **Shared Packages**:
  - `packages/prisma`: Centralized database schema and client.
  - `packages/api-contracts`: Shared types and contracts.
  - `packages/shared`: Common utilities (Zod schemas, env handling).
  - `packages/tsconfig`: Composable TypeScript configurations.
  - `packages/eslint-config`: Unified linting rules.

## 🛠 Prerequisites

- **Bun** (v1.3.5 or later) - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** (v18 or later) - Required for some ecosystem tools.

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd monorepo-template
```

### 2. Install dependencies

Using Bun's workspace support:

```bash
bun install
```

### 3. Environment Setup

Copy the example environment files and configure your local variables:

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Update DATABASE_URL in apps/backend/.env
# Update other secrets as needed
```

### 4. Database Setup

Ensure your PostgreSQL database is running, then generate the Prisma client:

```bash
# Generate Prisma Client
bun run db:generate

# Push schema to database (for development)
bun run db:push
```

### 5. Run Development Server

Start all services (backend and frontend) in parallel:

```bash
bun run dev
```

- **Frontend**: http://localhost:5173
- **Backend/API**: http://localhost:3000

## 📦 Project Structure

```text
/
├── apps/
│   ├── backend/        # Express + tRPC server
│   └── frontend/       # Vite + React application
├── packages/
│   ├── api-contracts/  # Shared types & interface definitions
│   ├── prisma/         # Prisma schema & client singleton
│   ├── shared/         # Shared utilities & Zod schemas
│   ├── tsconfig/       # Base TypeScript configs
│   └── eslint-config/  # Shared ESLint config
└── package.json        # Root config & workspaces
```

## 📖 Documentation

For detailed architectural decisions and development procedures, please refer to:

- [**Architecture Overview**](./architecture.md): Deep dive into the system's structural patterns and choices.
- [**Development Procedures**](./architecture_procedure.md): Step-by-step guides for creating APIs, adding features, and common workflows.

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Start development servers for all apps |
| `bun run build` | Build all apps and packages |
| `bun run lint` | Lint all packages |
| `bun run format` | Format code with Prettier |

## 🤝 Contributing

Contributions are welcome! Please read our [Development Procedures](./architecture_procedure.md) before submitting a Pull Request.

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
