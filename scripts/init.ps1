Write-Output "🚀 Anokha 2025 Project Init Script"

Write-Output "→ Installing dependencies..."
pnpm install

Write-Output "→ Installing husky..."
pnpm exec husky install

Write-Output "→ Adding pre-commit hook (pnpm lint)..."
pnpm exec husky add .husky/pre-commit "pnpm lint"

Write-Output "→ Checking current branch..."
git branch --show-current

if (-Not (Test-Path ".env")) {
    Write-Output "→ Creating .env file..."
    Copy-Item ".env.example" ".env"
} else {
    Write-Output "→ .env file already exists."
}

Write-Output "✅ Init complete! You can now run: pnpm dev" 