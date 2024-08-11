# Books API

This document provides an overview of the setup and usage instructions for the project.

## Prerequisites

You need Docker installed on your local machine.

## Setup

To set up the project locally, follow these steps:

1. Clone the repository to your local machine using Git.

2. Create an environment file named `.env` in the `./backend/` directory, based on the `.env.example` file provided.

3. Run the following command to start the application using Docker Compose: `docker-compose --env-file ./backend/.env up --build`

## Web Access

1. Access the backend service at `http://localhost:8000/`.

2. Access the MailHog interface at `http://localhost:8025/`.

## API Endpoints

### Books

- **Get All Books**: `GET http://localhost:8000/books/`
- **Get Book By ID**: `GET http://localhost:8000/books/:id`
- **Create New Book** (Requires JWT Token and Admin Access): `POST http://localhost:8000/books` with request body e.g.: <br>
`json { "title": "Classical Mythology A to Z: An Encyclopedia of Gods & Goddesses, Heroes & Heroines, Nymphs, Spirits, Monsters, and Places", "author": "Annette Giesecke", "publicationDate": "2020-10-06T00:00:00Z", "genres": ["History", "Mythology", "Education"] }`
- **Update Book By ID** (Requires JWT Token and Admin Access): `PUT http://localhost:8000/books/:id` with request body e.g:<br>
`json { "title": "War and Peace", "author": "Tolstoy Leo", "publicationDate": "2000-12-22T00:00:00Z", "genres": ["Novel", "Historical novel"] }`
- **Delete Book By ID** (Requires JWT Token and Admin Access): `DELETE http://localhost:8000/books/:id`

### Users

- **Register User**: `POST http://localhost:8000/users/register` with request body e.g.:
`json { "email": "tester2223@test.io", "password":"teste", "username":"tester22" }`
- **Login**: `POST http://localhost:8000/users/login` with request body e.g.:<br>
`json { "email":"tester2223@test.io", "password":"teste" }`
- **Get User By ID** (Requires JWT Token): `GET http://localhost:8000/users/me`
- **Update User Role** (Requires JWT Token and Admin Access): `PUT http://localhost:8000/users/:id/role` with request body e.g.:<br>
`json { "roleId": 3 }`
- **Verify Email**: `PUT http://localhost:8000/users/verify/:token` (Emails with link are sent to MailHog)

## Database Initialization

The database is populated with predefined roles and users upon startup. To modify this data, update the scripts `01-seed.ts`, `02-seed.ts`, and `03-seed.ts` located in the `./backend/seeds` folder.

## Used libraries and software
- **Express**
- **Prisma**
- **Docker**
- **Postgres**