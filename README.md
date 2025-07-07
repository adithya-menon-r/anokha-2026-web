## Project Init (First Time Setup)

To install and configure the project for development, follow these steps:

### Linux / macOS:

```bash
./scripts/init.sh
```

### Windows (PowerShell):

```powershell
./scripts/init.ps1
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
