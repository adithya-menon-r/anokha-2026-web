#!/bin/bash

echo "Anokha 2026 Project Init Script"

echo "→ Installing dependencies..."
pnpm install

echo "→ Installing husky..."
pnpm add --save-dev husky

echo "→ Adding pre-commit hook (pnpm lint)..."
pnpm exec husky add .husky/pre-commit "pnpm lint"

echo "→ Checking current branch..."
git branch --show-current

if [ ! -f .env ]; then
  echo "→ Creating .env file..."
  cp .env.example .env
else
  echo "→ .env file already exists."
fi

echo "Init complete!" 