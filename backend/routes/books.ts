import { Router } from "express";
import {
    getAllBooks,
    postCreateNewBook,
    getBookById,
    putUpdateBookByID,
    deleteBookByID
} from "../controllers/books";
import verifyToken from "../middleware/verify-token";

const router = Router();

router.route('/').get(getAllBooks).post(verifyToken, postCreateNewBook)
router.route('/:id').get(getBookById).put(verifyToken, putUpdateBookByID).delete(verifyToken, deleteBookByID)

export default router