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
- Set up Husky and add a pre-commit hook to run `npm run lint`
- Create a `.env` file in the project root from `scripts/.env.example` (if `.env` does not exist)

**Note:**

- If you need to update environment variables, edit `scripts/.env.example` and re-run the init script, or manually copy it to `.env` in the project root.
- Husky will be set up automatically to manage Git hooks and enforce linting on commit.

You can now start the development server:

```bash
npm run dev
```
