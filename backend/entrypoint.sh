#!/bin/sh

cd /backend || exit

echo "Creating init migration"
npx prisma migrate dev --name init

echo "Deploying Prisma migrations..."
npx prisma migrate deploy

echo "Seeding the database..."
npm run seed

echo "Starting the application..."
npm run start

exec "$@"
