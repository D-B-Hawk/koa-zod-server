# KOA-ZOD-SERVER

## Setup

Install dependencies

> npm i

Copy env

> cp .env.example .env

Create development/test databases

> npm run db create

Run existing migrations

> npm run db migrate

Run server

> npm run dev

## Scripts

create dev/test db

> npm run db create

run migration

> npm run db migrate

rollback migration

> npm run db rollback

add migration

> npm run db new <MIGRATION_NAME>
