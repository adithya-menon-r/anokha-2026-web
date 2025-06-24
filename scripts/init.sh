#!/bin/bash

echo "🚀 Anokha 2025 Project Init Script"

echo "→ Installing dependencies..."
npm install

echo "→ Installing husky..."
npx husky install

echo "→ Adding pre-commit hook (npm run lint)..."
npx husky add .husky/pre-commit "npm run lint"

echo "→ Checking current branch..."
git branch --show-current

if [ ! -f .env ]; then
  echo "→ Creating .env file..."
  cp .env.example .env
else
  echo "→ .env file already exists."
fi

echo "✅ Init complete! You can now run: npm run dev" 