import { v4 as uuidv4 } from "uuid";
import getRateLimitHeaders from "../utils/rateLimitUtils.js";

const books = [];

const createBook = (req, res) => {
	const { title, author, genre, publication_date, availability, edition, summary } =
		req.body;

	if (
		!title ||
		!author ||
		!genre ||
		!publication_date ||
        !availability ||
		!edition ||
		!summary
	) {
		return res.status(400).json({
			status: "error",
			message: "Please fill all required fields",
		});
	}

	const isDuplicate = books.some(
		(book) => book.title === title && book.author === author
	);

	if (isDuplicate) {
		return res.status(409).json({
			status: "error",
			message:
				"A book with the same title by this author already exists.",
		});
	}

	const newBook = {
		id: uuidv4(),
		title,
		author,
		genre,
		publication_date,
        availability,
		edition,
		summary,
	};

	books.push(newBook);

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(201).json({
		book: newBook,
		status: "success",
		message: "Book created successfully",
		headers: rateLimitHeaders,
	});
};

const getAllBooks = (req, res) => {
	if (books.length === 0) {
		return res.status(404).json({
			status: "error",
			message: "No books found",
		});
	}

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(200).json({
		books: books,
		status: "success",
		message: "Books retrieved successfully",
		headers: rateLimitHeaders,
	});
};

const getSingleBook = (req, res) => {
	const book = books.find((book) => book.id === req.params.bookId);

	if (!book) {
		return res.status(404).json({
			status: "error",
			message: "Book not found",
		});
	}

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(200).json({
		book: book,
		status: "success",
		message: "Book retrieved successfully",
		headers: rateLimitHeaders,
	});
};

const updateBook = (req, res) => {
	const book = books.find((book) => book.id === req.params.bookId);

	if (!book) {
		return res.status(404).json({
			status: "error",
			message: "Book not found",
		});
	}

	const { title, author, genre, publication_date, availability, edition, summary } =
		req.body;

	// Update book details
	book.title = title || book.title;
	book.author = author || book.author;
	book.genre = genre || book.genre;
	book.publication_date = publication_date || book.publication_date;
	book.availability = availability || book.availability;
    book.edition = edition || book.edition;
	book.summary = summary || book.summary;

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(200).json({
		data: book,
		status: "success",
		message: "Book updated successfully",
		headers: rateLimitHeaders,
	});
};

const deleteBook = (req, res) => {
	const bookIndex = books.findIndex((book) => book.id === req.params.bookId);

	if (bookIndex === -1) {
		return res.status(404).json({
			status: "error",
			message: "Book not found",
		});
	}

    const book = books[bookIndex];

    if (book.availability === "not available" || book.availability === false) {
        books.splice(bookIndex, 1);
    }

	// Remove the book from the array
	books.splice(bookIndex, 1);

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(200).json({
		status: "success",
		message: "Book deleted successfully",
		headers: rateLimitHeaders,
	});
};

export { createBook, getAllBooks, getSingleBook, updateBook, deleteBook };
