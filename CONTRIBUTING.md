# Contributing to Orbis Website

Thank you for your interest in contributing to the Gaia project! This document provides guidelines and specifications for contributing to this monorepo.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Project Overview

Gaia is a Discord application built to provide information about the Orbis.place web and services through Discord, intended to serve as a way to enhance the community at Orbis.place

## Tech Stack

### Discord Bot

- **Fetch Library**: axios 1.13.2
- **Discord API Wrapper**: discord.js 14.25.1
- **Scheduling**: toad-scheduler 3.1.0
- **Env management**: envalid 8.1.1
- **Logging**: pino 10.1.0

### Database

- **ORM**: Prisma 7.0.1
- **Database**: PostgreSQL (via Prisma adapter)

### Monorepo Tools

- **Package Manager**: pnpm 10.23.0
- **Linting**: ESLint 9.39.1
- **Formatting**: Prettier 3.6.2

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 10.23.0

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Gaia
```

2. Install dependencies:

```bash
pnpm install
```

3. Prepare appliciatiion

```bash
pnpm run prepare
```

4. Start development servers:

```bash
# From the root directory
pnpm dev
```

This will start:

- The Discord Bot using the Discord Token and Discord Client ID specified.

## Development Workflow

### Available Scripts

From the root directory:

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm test` - Run all test suites
- `pnpm lint` - Lint all projects

## Project Structure

```
.
├── src/
│   ├── assets/                   # Assets such as fonts/images/videos
│   ├── consts/                   # Constants for the application
│   ├── dal/                      # Data access layers (DALs) for various features
│   ├── interaction/              # Contains all interaction files for events/commands/buttons/etc.
│   ├── lib/                      # Contains all additional action/utility
│   ├── types/                    # Contains all types for the application
│   ├── bot.ts                    # Contains the class that runs the Discord app and essential functions.
│   └── index.ts/                 # Main entry point for the application.
├── .prettierrc.js                # Prettier configuration
├── eslint.config.js              # ESLint configurationn
├── .lintstagedrc.json           # Configuration for linters/formatted on only files staged.
└── package.json                  # Root package configuration
```

## Code Standards

### TypeScript

- All code must be written in TypeScript
- Maintain strict type safety
- Use proper type definitions; avoid `any` when possible
- Run `pnpm check-types` before committing

### Linting

- Follow the ESLint configuration in `@repo/eslint-config`
- Fix all linting errors before submitting
- Maximum warnings allowed: 0 (strict mode)
- Run `pnpm lint` to check for issues

### Code Formatting

- Use Prettier for consistent code formatting
- Supported file types: `.ts`, `.tsx`, `.md`
- Run `pnpm format` before committing
- Configuration is in `@repo/eslint-config/prettier-base.js`

### Best Practices

1. **Component Organization**: Keep components small and focused
2. **Error Handling**: Implement proper error boundaries and API error handling
3. **Authentication**: Use Better Auth patterns consistently
4. **Database**: Always use Prisma for database operations
5. **API Design**: Follow RESTful principles and document with Swagger
6. **Performance**: Utilize Next.js optimization features and NestJS best practices

## Commit Guidelines

### Commit Message Format

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add email verification flow

Implemented email verification using Better Auth
- Added verification endpoint
- Updated user schema
- Added email templates

Closes #123
```

```
fix(api): resolve CORS configuration issue

Updated CORS settings to allow credentials
```

## Pull Request Process

1. **Create a Branch**
   - Use descriptive branch names: `feature/add-user-profile`, `fix/login-redirect`
   - Branch from `development` (or main branch as configured)

2. **Make Your Changes**
   - Follow the code standards outlined above
   - Write or update tests as needed
   - Update documentation if required

3. **Before Submitting**
   - Run `pnpm lint` and fix all issues
   - Run `pnpm format` to format code
   - Run `pnpm test` to ensure all tests pass
   - Run `pnpm build` to verify the build works

4. **Submit Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Request review from maintainers
   - Respond to feedback promptly

5. **After Approval**
   - Ensure CI/CD passes
   - Squash commits if requested
   - Maintainers will merge when ready

## Questions or Issues?

If you have questions or run into issues:

- Check existing issues in the repository
- Create a new issue with detailed information
- Reach out to the maintainers

Thank you for contributing to Gaia!
