Write-Output "Anokha 2026 Project Init Script"

Write-Output "→ Installing dependencies..."
pnpm install

Write-Output "→ Installing husky..."
pnpm add --save-dev husky

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

Write-Output "Init complete!" 