# Architecture Overview

This document provides a detailed technical breakdown of the `<monorepo-name>` architecture. It is designed to assist both human developers and AI agents in understanding the system's structural patterns, shared configurations, and development workflows for accurate replication and maintenance.

## 1. High-Level Architecture

- **Monorepo Manager**: [Turborepo](https://turbo.build/)
- **Package Manager**: [Bun](https://bun.sh/) (v1.3.5+)
- **Workspace Strategy**: Bun Workspaces + Turbo
- **Language**: TypeScript throughout

### Key Structural Patterns

- **Centralized Dependency Management**: Uses standard dependency declarations in `package.json` for external libs (`zod`, `dotenv`, `express`, etc.) across all workspaces. Internal workspace packages are referenced via `workspace:*`.
- **Strict Boundaries**: Enforced via `eslint-plugin-boundaries` to prevent circular dependencies (e.g., packages cannot import apps).
- **Unified Database Schema**: A single Prisma schema in `@<scope>/prisma` serves as the source of truth for all services.

---

## 2. Directory Structure

```text
/
├── apps/                  # Deployable applications and services
│   ├── backend/           # Main Express/tRPC backend
│   └── frontend/          # React Vite application
├── packages/              # Shared libraries
│   ├── prisma/            # Shared database client & schema
│   ├── tsconfig/          # Shared TypeScript configurations
│   ├── eslint/            # Shared Linting configurations
│   └── api-contracts/     # Shared types/contracts
├── turbo.json             # Turbo pipeline configuration
└── package.json           # Root config, workspaces
```

---

## 3. Shared Packages Detail

### 3.1. Database Layer (`packages/prisma`)

This package exports a singleton `PrismaClient` instance and manages the database schema.

- **Schema Location**: `packages/prisma/schema.prisma` (Unified schema).
- **Client Configuration**:
    - Exports `getPrismaClient(url)` factory and a singleton instance.
- **Environment Handling**:
    - Usually connects referencing `apps/backend/.env`. This establishes `backend` as the "source of truth" for database connection strings during development/migrations.
- **Commands**: Encapsulates `prisma generate`, `migrate`, and `studio` commands via Bun scripts.

### 3.2. TypeScript Configuration (`packages/tsconfig`)

Provides composable TS configs to ensure consistent compilation settings.

- **Files**:
    - `base.json`: The foundation. Defines strictly typed options (`strict: true`) and crucial Path Aliases:
        - `@apps/*` → `apps/*`
        - `@packages/*` → `packages/*`
        - `@<scope>/prisma` → `packages/prisma/index.ts`
        - `@<scope>/api-contracts` → `packages/api-contracts/src/index.ts`
    - `node.json`: Extends `base.json` for backend services (`target: ES2022`, `module: esnext`).
    - `react-library.json` / `react-native.json`: Extends `base.json` for frontend apps.

**Usage**: Apps extend these configs (e.g., `"extends": "@<scope>/tsconfig/node.json"`) and must re-declare `baseUrl` and `paths` if they have custom local paths, though they inherit the base aliases.

### 3.3. Linting (`packages/eslint`)

Exports a flat ESLint configuration (ESLint v9+ style).

- **Key Features**:
    - **Boundaries Plugin**: specifically configured to allow `app -> app/package` and `package -> package` dependencies, but **ban** `package -> app` imports to maintain architectural integrity.
    - **Globals**: Pre-configured for Node.js and ES2021+.

---

## 4. Application Integration Patterns

### 4.1. Core Service (`apps/backend`)

- **Type**: Express + tRPC Server.
- **Env**: Uses `.env` file from its own root. This file is also referenced by `packages/prisma` for migrations.
- **Dependencies**:
    - Consumes internal shared packages via workspace protocol: `"@<scope>/api-contracts": "workspace:*"`
    - Consumes external dependencies with explicitly stated versions.

### 4.2. Client Applications (e.g., `apps/frontend`)

- **Type**: React Vite Application.
- **Config**: Extends specific TS configs from `@<scope>/tsconfig`.
- **Dependencies**:
    - Consumes APIs via `@trpc/client` or `@trpc/react-query`.
    - Imports **Types** only from `@<scope>/api-contracts` to ensure type-safety without leaking backend code.

### 4.3. Shared Packages (`packages/*`)

Shared packages (e.g., `eslint`, `tsconfig`, `api-contracts`, `prisma`) are consumed by both apps and other packages to ensure consistency and type-safety.

- **Internal cross-package references** use the workspace protocol: `"@<scope>/tsconfig": "workspace:*"`

---

## 5. Development Workflow

- **Global Execution**:
    - `bun run dev`: Runs the turbo `dev` script to start services in parallel.
    - `bun run build`: Triggers the turbo build pipeline.

---

## 6. Key Package Versions

| Package        | Version   | Usage                     |
| :------------- | :-------- | :------------------------ |
| **Bun**        | `1.3.5`+  | Runtime & Package Manager |
| **Turborepo**  | `^2.8.0`  | Monorepo Build System     |
| **TypeScript** | `^5.6.0`  | Language Support          |
| **Prisma**     | `7.2.0`   | ORM & Database Adapter    |
| **tRPC**       | `11.8.1`  | Type-Safe API Layer       |
| **React**      | `^18.2.0` | Frontend Library          |
| **Zod**        | `^3.22.4` | Schema Validation         |
