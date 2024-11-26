# 📚 **Bookstore Inventory Management System - Backend**

This is a backend API for managing a **Bookstore Inventory Management System**. Built with **NestJS** and **PostgreSQL**, the system allows users to manage books, authors, categories, and inventory for a bookstore. It supports operations such as creating, updating, retrieving, and deleting books and authors.

---

## 📋 **Endpoints Overview**

### **Books**

- **`GET /books/getAllBooks`**  
  Retrieves a list of all books in the store.

- **`GET /books/getBookById/:id`**  
  Retrieves the details of a book by its ID.

- **`POST /books/createBook`**  
  Adds a new book to the inventory.

- **`PUT /books/updateBook/:id`**  
  Updates the details of an existing book.

- **`DELETE /books/deleteBook/:id`**  
  Marks a book as deleted by setting its status to `DELETED`.

### **Authors**

- **`GET /authors/getAllAuthors`**  
  Retrieves a list of all authors.

- **`GET /authors/getAuthorById/:id`**  
  Retrieves details of an author by their ID.

- **`POST /authors/createAuthor`**  
  Adds a new author.

- **`PUT /authors/updateAuthor/:id`**  
  Updates an author's details.

- **`DELETE /authors/deleteAuthor/:id`**  
  Marks an author as deleted.

---

## 🛠 **Technologies Used**

- **NestJS** for building the backend
- **PostgreSQL** for the database
- **TypeORM** for interacting with the database
- **Class-validator** for validating input data
- **Swagger** for API documentation

---

## 🚀 **Setup and Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bookstore-backend.git
   cd bookstore-backend
   npm install
   npm run start:dev

🤝 Contributing
Feel free to fork this repository and submit pull requests if you would like to contribute to the project!


This version provides a succinct explanation of what the project is about, a brief description of the API endpoints, and basic setup instructions.

