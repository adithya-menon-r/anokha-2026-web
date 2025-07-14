# Anokha 2025 Frontend

## About

This is the official frontend codebase for Anokha 2025, the tech fair of Amrita Vishwa Vidyapeetham, Coimbatore. It provides a modern, scalable, and maintainable platform for event management and user engagement.

## Onboarding & Documentation

All new contributors should refer to the comprehensive onboarding and guidelines document:

[Frontend Developer Onboarding Guide](https://docs.google.com/document/d/1_dnsJ_-27JL09zPOZln-e4Xp3UIbmlAa9pVG0HLfILE/edit?usp=sharing)

**Document Tabs:**

- **Frontend Developer Onboarding Guide:** Step-by-step setup and workflow for new developers.
- **Tech Stack:** Overview of frameworks, libraries, and tools used in the project.
- **Guidelines & Ruleset:** Coding standards, best practices, and review process.
- **API Structure & Layering Guide:** How to interact with the backend and organize API calls.
- **Using AI for Development:** Tips for leveraging AI tools in your workflow.
- **Git Branching Rules:** Branching strategy and commit conventions for collaboration.

---

## Project Init (First Time Setup)

To install and configure the project for development, follow these steps:

### Linux / macOS:

```bash
./scripts/init.sh
```

### Windows (PowerShell):

```ps1
.\scripts\init.ps1
```

This will:

- Install dependencies
- Set up Husky and add a pre-commit hook to run `pnpm lint`
- Create a `.env` file in the project root from `.env.example` (if `.env` does not exist)

**Note:**

- If you need to update environment variables, edit `.env.example` and re-run the init script, or manually copy it to `.env` in the project root.
- Husky will be set up automatically to manage Git hooks and enforce linting on commit.

> Add ex:- `{/** biome-ignore lint/a11y/noStaticElementInteractions: do this biome throws an error here */}` just above your code when biome screams unavoidable errors/warnings down the line

You can now start the development server:

```bash
pnpm dev
```
