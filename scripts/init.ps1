Write-Output "🚀 Anokha 2025 Project Init Script"

Write-Output "→ Installing dependencies..."
npm install

Write-Output "→ Installing husky..."
npx husky install

Write-Output "→ Adding pre-commit hook (npm run lint)..."
npx husky add .husky/pre-commit "npm run lint"

Write-Output "→ Checking current branch..."
git branch --show-current

if (-Not (Test-Path ".env")) {
    Write-Output "→ Creating .env file..."
    Copy-Item ".env.example" ".env"
} else {
    Write-Output "→ .env file already exists."
}

Write-Output "✅ Init complete! You can now run: npm run dev" 