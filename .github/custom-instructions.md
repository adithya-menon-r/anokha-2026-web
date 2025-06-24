# Anokha 2025 — Copilot Reviewer Instructions

You are reviewing pull requests for the Anokha 2025 Frontend project. Follow these instructions strictly.

## Architecture Overview

Tech Stack:

- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4 with CSS variables
- TanStack Query v5
- Zustand (with persist middleware)
- React Hook Form + Zod validation
- Axios API wrapper with interceptors

Project Structure:

src/
├── lib/api.ts # Axios instance + helpers
├── services/ # API service layer
├── hooks/ # Custom hooks (data + state)
├── components/ # Dumb UI components
├── features/ # Smart components (page logic)
├── stores/ # Zustand stores
├── types/ # Shared TypeScript types
└── examples/ # Reference patterns

## Design Patterns (Golden Rules)

API Layer Pattern (CRITICAL)

Component → Hook → Service → API Wrapper → Backend

Wrong:

// Component directly calling API
const handleSubmit = async () => {
const response = await axios.post('/api/events', data);
};

Correct:

// Component uses hook
const { mutate } = useCreateEvent();

// Hook uses service
export function useCreateEvent() {
return useMutation({
mutationFn: EventService.createEvent,
onSuccess: () => toast.success('Event created!'),
});
}

// Service uses API wrapper
export const EventService = {
createEvent: (data: CreateEventPayload) => apiPost('/events', data),
};

State Management Rules:

- TanStack Query: All GET/read operations + caching
- Zustand: App state (auth, UI modals, filters)
- React State: Component-specific UI state only

Naming Conventions:

| Type             | Pattern          | Example           |
| ---------------- | ---------------- | ----------------- |
| Folders          | kebab-case       | event-management/ |
| Component files  | PascalCase       | EventCard.tsx     |
| Functions        | camelCase        | handleSubmit      |
| Types/Interfaces | PascalCase       | EventType         |
| Constants        | UPPER_SNAKE_CASE | API_ENDPOINTS     |
| CSS classes      | kebab-case       | event-card        |

## Code Quality Standards

TypeScript (CRITICAL):

- No any types
- Strict mode enabled
- Generic types for reusable components
- Discriminated unions for complex state

Error & Loading Handling (CRITICAL):

Every component with async data must handle:

- Loading state - Show skeleton/spinner
- Error state - Show error message + retry
- Empty state - Show empty state UI
- Success feedback - Toast notifications

Forms (CRITICAL):

- React Hook Form + Zod for all forms
- Inline validation with error messages
- Loading state on submit button
- Disabled state while submitting

## Anti-Patterns to Flag

Critical Issues (BLOCK PR):

- Direct axios/fetch calls in components or hooks
- any type usage
- Missing loading/error handling
- No service layer for API calls
- Raw toast calls in JSX
- Missing TypeScript types
- Console.log statements in production code

Major Issues (REQUIRE FIX):

- Components > 300 lines
- Missing form validation
- No error boundaries
- Hardcoded API URLs
- Inline styles
- Missing accessibility attributes
- No skeleton loading states

Minor Issues (SUGGEST FIX):

- Inconsistent naming conventions
- Missing JSDoc comments
- Unused imports
- Missing prop types validation
- Inefficient re-renders

## Specific Checks

Service Layer:

- All API calls go through /services/
- Services use apiGet/apiPost from /lib/api.ts
- Proper error handling with toast
- TypeScript types for payloads/responses

Hooks:

- Use object form of TanStack Query
- Proper query keys (array format)
- Stale time configured appropriately
- Query invalidation in mutations

Components:

- Dumb components: no hooks, pure UI
- Smart components: handle data + states
- Proper prop types
- Accessibility attributes (aria-label, role)

Stores (Zustand):

- Small, focused stores by domain
- Proper TypeScript types
- Persist middleware for auth data
- No circular dependencies

## UI/UX Standards

Accessibility (CRITICAL):

- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

Performance:

- No unnecessary re-renders
- Proper React.memo usage
- Lazy loading for large components
- Optimized bundle size
- Image optimization

Security:

- No sensitive data in client-side code
- Proper token handling
- XSS prevention (no dangerouslySetInnerHTML)
- Input sanitization

## Review Checklist

Before Approving PR:

- All critical issues resolved
- Code follows /examples/ patterns
- No console.log statements
- Proper TypeScript types
- Loading/error states implemented
- Forms use RHF + Zod
- API calls through service layer
- Accessibility requirements met
- Performance considerations addressed (optional)

Review Comments Format:

## Critical Issue

[Description of critical issue that blocks PR]

## Major Issue

[Description of major issue that needs fixing]

## Suggestion

[Optional improvement suggestion]

## Good

[Positive feedback]

## Examples Reference

Always refer to /examples/ folder for:

- Service patterns: examples/services/
- Hook patterns: examples/hooks/
- Component patterns: examples/components/
- Store patterns: examples/stores/
- Form patterns: examples/features/

---

Remember: This project follows strict architectural patterns. When in doubt, check the /examples/ folder for reference implementations.
