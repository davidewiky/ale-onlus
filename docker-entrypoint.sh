#!/bin/sh
set -e

echo "Applying Prisma migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx tsx prisma/seed.ts

echo "Starting Next.js..."
exec "$@"
