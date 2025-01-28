# Library Management System

This is a simple RESTful API for managing a library system, built with Node.js and Express.js. The API allows users to perform CRUD operations on books, including creating, retrieving, updating, and deleting book records.

## Features

- Add new books to the library.
- Retrieve all books or a specific book by ID.
- Update book details.
- Delete books from the library.
- Rate limiting to prevent abuse of the API.

## Postman Documentation
- https://www.postman.com/robertghandi/my-workspace/collection/dr8bbyb/library-management-api?action=share&creator=32178925

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd library-management
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   npm start
   ```

2. The server will start on port `3000` by default. You can access the API at:

   ```
   http://localhost:3000/api/v1/books
   ```

## API Endpoints

### Base URL

```
http://localhost:3000/api/v1/books
```

### Endpoints

#### 1. Create a Book

- **POST** `/`
- **Description:** Adds a new book to the library.
- **Request Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Genre",
    "publication_date": "YYYY-MM-DD",
    "availability": "available",
    "edition": "Edition",
    "summary": "A brief summary of the book."
  }
  ```
- **Response:**
  ```json
  {
    
    "book": {
      "id": "unique-id",
      "title": "Book Title",
      "author": "Author Name",
      "genre": "Genre",
      "publication_date": "YYYY-MM-DD",
      "availability": "available",
      "edition": "Edition",
      "summary": "A brief summary of the book."
    },
    "status": "success",
    "message": "Book created successfully",
    "headers": {
        "X-RateLimit-Limit": "",
        "X-RateLimit-Remaining": "",
        "X-RateLimit-Reset": ""
    }
  }
  ```

#### 2. Get All Books

- **GET** `/`
- **Description:** Retrieves all books in the library.
- **Response:**
  ```json
  {
    
    "books": [
      {
        "id": "unique-id",
        "title": "Book Title",
        "author": "Author Name",
        "genre": "Genre",
        "publication_date": "YYYY-MM-DD",
        "edition": "Edition",
        "summary": "A brief summary of the book."
      }
    ],
    "status": "success",
    "message": "Books retrieved successfully",
    "headers": {
        "X-RateLimit-Limit": "",
        "X-RateLimit-Remaining": "",
        "X-RateLimit-Reset": ""
    }
  }
  ```

#### 3. Get a Single Book

- **GET** `/:bookId`
- **Description:** Retrieves a specific book by its ID.
- **Response:**
  ```json
  {
    "book": {
      "id": "unique-id",
      "title": "Book Title",
      "author": "Author Name",
      "genre": "Genre",
      "publication_date": "YYYY-MM-DD",
      "edition": "Edition",
      "summary": "A brief summary of the book."
    },
    
    "status": "success",
    "message": "Book retrieved successfully",
    "headers": {
        "X-RateLimit-Limit": "",
        "X-RateLimit-Remaining": "",
        "X-RateLimit-Reset": ""
    }
  }
  ```

#### 4. Update a Book

- **PUT** `/:bookId`
- **Description:** Updates the details of a specific book.
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "genre": "Updated Genre",
    "publication_date": "YYYY-MM-DD",
    "edition": "Updated Edition",
    "summary": "Updated summary."
  }
  ```
- **Response:**
  ```json
  {
    
    "book": {
      "id": "unique-id",
      "title": "Updated Title",
      "author": "Updated Author",
      "genre": "Updated Genre",
      "publication_date": "YYYY-MM-DD",
      "edition": "Updated Edition",
      "summary": "Updated summary."
    },
    "status": "success",
    "message": "Book updated successfully",
    "headers": {
        "X-RateLimit-Limit": "",
        "X-RateLimit-Remaining": "",
        "X-RateLimit-Reset": ""
    }
  }
  ```

#### 5. Delete a Book

- **DELETE** `/:bookId`
- **Description:** Deletes a specific book by its ID.
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Book deleted successfully"
  }
  ```

## Middleware

### Rate Limiting

The API is protected by a rate limiter to prevent abuse. Each client is allowed a maximum of 100 requests per 15 minutes.

- **Response on Exceeding Limit:**
  ```json
  {
    "status": "error",
    "message": "Too many requests, please try again later."
  }
  ```

## Project Structure

```
library-management/
├── controllers/
│   └── bookController.js   # Contains the controller logic for books
├── middleware/
│   └── rateLimiter.js      # Rate limiting middleware
├── routes/
│   └── bookRoutes.js       # Defines the API routes for books
├── utils/
│   └── rateLimitUtils.js   # Utility for generating rate limit headers
├── index.js                # Entry point of the application
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```



