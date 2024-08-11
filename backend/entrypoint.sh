#!/bin/sh

cd /backend || exit

echo "Deploying Prisma migrations..."
npx prisma migrate deploy

echo "Seeding the database..."
npm run seed

echo "Starting the application..."
npm run start

exec "$@"
