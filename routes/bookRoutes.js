import express from "express";
import {
	createBook,
	getAllBooks,
	getSingleBook,
	updateBook,
	deleteBook,
} from "../controllers/bookController.js";
const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:bookId", getSingleBook);
router.put("/:bookId", updateBook);
router.delete("/:bookId", deleteBook);

export default router;
