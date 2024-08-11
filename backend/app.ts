import express from "express";

import notFound from "./middleware/not-found-wrapper";
import errorWrapper from "./middleware/error-wrapper";

import books from "./routes/books"
import users from "./routes/users"

const BACKEND_PORT = 8000;

const app = express();

app.use(express.json());

app.use('/books', books);
app.use('/users', users);

app.use(notFound);
app.use(errorWrapper);

app.get('/', (req, res) => {
    res.send("Books API")
});

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