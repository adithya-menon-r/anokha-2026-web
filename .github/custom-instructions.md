# Anokha 2026 - Copilot Instructions

You are working on the Anokha 2026 Frontend project. Follow these guidelines:

## Architecture

- Use Next.js 15 (App Router) with React 19 and TypeScript
- Follow the API layer pattern: Component → Hook → Service → API Wrapper → Backend
- All API calls must go through `/services/` using the `/lib/api.ts` wrapper
- Use TanStack Query v5 for data fetching and caching
- Use Zustand for global state management
- Use React Hook Form + Zod for all forms

## Code Patterns

- Dumb components: pure UI, no hooks, accept typed props
- Smart components: use hooks, handle loading/error/empty states
- Services: use `apiGet<T>()` and `apiPost<T>()` from `/lib/api.ts`
- Hooks: use TanStack Query object form with proper query keys
- Stores: use Zustand with persist middleware for auth data
- Forms: use React Hook Form with Zod resolver and inline validation

## Quality Standards

- No `any` types - use proper TypeScript typing
- Handle loading, error, and empty states in all components
- Show toast notifications for user actions
- Follow naming conventions: kebab-case folders, PascalCase components, camelCase functions
- No direct axios calls in components or hooks
- No console.log statements in production code

## Reference

- Check `/examples/` folder for reference patterns
- Match the style and structure of existing code
- Use the same patterns for services, hooks, components, and stores as shown in examples
