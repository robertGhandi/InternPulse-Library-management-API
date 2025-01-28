import { v4 as uuidv4 } from "uuid";
import getRateLimitHeaders from "../utils/rateLimitUtils.js";

const books = [];

const createBook = (req, res) => {
	const {
		title,
		author,
		genre,
		publication_date,
		availability,
		edition,
		summary,
	} = req.body;

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
			code: 400,
			message: "Please fill all required fields",
			errors: {
				requiredFields: [
					"title",
					"author",
					"genre",
					"publication_date",
					"availability",
					"edition",
					"summary",
				],
			},
			timestamp: new Date().toISOString(),
		});
	}

	const isDuplicate = books.some(
		(book) => book.title === title && book.author === author
	);

	if (isDuplicate) {
		return res.status(409).json({
			status: "error",
			code: 409,
			message: "Conflict: Duplicate book",
			errors: {
				details:
					"A book with the title and author already exists in the library",
			},
			timestamp: new Date().toISOString(),
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
        code: 201,
		message: "Book created successfully",
		headers: rateLimitHeaders,
	});
};

const getAllBooks = (req, res) => {
	if (books.length === 0) {
		return res.status(404).json({
			status: "error",
			code: 404,
			message: "No books found",
			errors: {
				details: "The library has no books available.",
			},
			timestamp: new Date().toISOString(),
		});
	}

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(200).json({
		books: books,
		status: "success",
        code: 200,
		message: "Books retrieved successfully",
		headers: rateLimitHeaders,
	});
};

const getSingleBook = (req, res) => {
	const book = books.find((book) => book.id === req.params.bookId);

	if (!book) {
		return res.status(404).json({
			status: "error",
			code: 404,
			message: "Book not found",
			errors: {
				bookId: req.params.bookId,
				details:
					"The book with the specified ID was not found in the library.",
			},
			timestamp: new Date().toISOString,
		});
	}

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(200).json({
		book: book,
		status: "success",
        code: 200,
		message: "Book retrieved successfully",
		headers: rateLimitHeaders,
	});
};

const updateBook = (req, res) => {
	const book = books.find((book) => book.id === req.params.bookId);

	if (!book) {
		return res.status(404).json({
			status: "error",
			code: 404,
			message: "Book not found",
			errors: {
				bookId: req.params.bookId,
				details:
					"The book with the specified ID was not found in the library.",
			},
			timestamp: new Date().toISOString(),
		});
	}

	const {
		title,
		author,
		genre,
		publication_date,
		availability,
		edition,
		summary,
	} = req.body;

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
        code: 200,
		message: "Book updated successfully",
		headers: rateLimitHeaders,
	});
};

const deleteBook = (req, res) => {
	const bookIndex = books.findIndex((book) => book.id === req.params.bookId);

	if (bookIndex === -1) {
		return res.status(404).json({
			status: "error",
			code: 404,
			message: "Book not found",
			errors: {
				bookId: req.params.bookId,
				details:
					"The book with the specified ID was not found in the library.",
			},
			timestamp: new Date().toISOString(),
		});
	}

	const book = books[bookIndex];

	if (book.availability === "available" || book.availability === true) {
		return res.status(400).json({
			status: "error",
			code: 400,
			message: "Cannot delete a book that is still available.",
			errors: {
				bookId: req.params.bookId,
				availability: book.availability,
				details:
					"You can only delete books that are lost, damaged, or no longer available.",
			},
			timestamp: new Date().toISOString(),
		});
	}

	// Remove the book from the array
	const deletedBook = books.splice(bookIndex, 1);

	const rateLimitHeaders = getRateLimitHeaders(req);

	return res.status(200).json({
		status: "success",
        code: 200,
		message: "Book deleted successfully",
		book: deletedBook,
		headers: rateLimitHeaders,
		timestamp: new Date().toISOString(),
	});
};

export { createBook, getAllBooks, getSingleBook, updateBook, deleteBook };
