#!/usr/bin/env bash
set -euo pipefail
npm run build
npx vercel link --confirm || true
npx vercel --prod
