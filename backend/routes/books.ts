import { Router } from "express";
import {
    getAllBooks,
    postCreateNewBook,
    getBookById,
    putUpdateBookByID,
    deleteBookByID
} from "../controllers/books";

const router = Router();

router.route('/').get(getAllBooks).post(postCreateNewBook)
router.route('/:id').get(getBookById).put(putUpdateBookByID).delete(deleteBookByID)

export default router