import express from "express";
import path from 'path';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import notFound from "./middleware/not-found-wrapper";
import errorWrapper from "./middleware/error-wrapper";

import books from "./routes/books"

dotenv.config({ path: path.resolve(`.env`) });

const BACKEND_PORT = 8000;
const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
    throw new Error('JWT SECRET is missing in .env file');
}

// const DATABASE_ROOT = process.env.DATABASE_ROOT || 'postgres';
// const DATABASE_PASS = process.env.DATABASE_PASS || 'password';
// const DATABASE_NAME = process.env.DATABASE_NAME || "mydb";
// const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';

// const connectionURL = `postgresql://${DATABASE_ROOT}:${DATABASE_PASS}@D${DATABASE_HOST}:5432/${DATABASE_NAME}?schema=public`;

const app = express();

app.use(express.json());
app.use('/books', books);
app.use(notFound);
app.use(errorWrapper);

app.get('/', (req, res) => {
    res.send("Books API")
});

app.post("/users/login", (req, res) => {
    const token = jwt.sign(
        {
            email: req.body.email,
        },
        SECRET,
        { expiresIn: '1h' }
    );

    res.json({
        succcess: true,
        token: token
    })
})

const start = async () => {
    try {
        app.listen(BACKEND_PORT, () => {
            console.log(`Server is listening on port ${BACKEND_PORT}...`);
        }).on("error", (err) => console.log(`Error; ${err}`));
    }
    catch (err) {
        console.log(err);
    }
}

start();