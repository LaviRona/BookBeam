# NestJS Book Review API

A simple—but production-ready—REST API for managing a catalogue of books and user reviews.  
Built with **NestJS**, **TypeScript**, and **class-validator**, the service demonstrates clean architecture, layered validation, and auto-generated Swagger docs.

![Swagger screenshot](./docs/swagger-ui.png)

---

## Table of Contents
1. [TL;DR Quick Start](#tldr-quick-start)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Getting Started](#getting-started)
5. [API Reference](#api-reference)
6. [Example Requests](#example-requests)
7. [Testing](#testing)
8. [Project Structure](#project-structure)
9. [License](#license)

---

## TL;DR Quick Start
```bash
# 1 Install
npm install

# 2 Start in watch mode
npm run start:dev

# 3 Open docs
open http://localhost:3000/api
```

> **Default port:** `3000`  
> **Swagger UI:** `/api`

---

## Features
- **Books CRUD** — create, read, update (`PUT`), and delete books.
- **Nested Reviews CRUD** — `/books/:bookId/reviews` routes with validation pipes.
- **Average Rating Endpoint** — `GET /books/:id/rating` returns the rounded mean.
- **Global Validation & Error Filter** — consistent `404/409` JSON shape.
- **Swagger/OpenAPI 3.1** — decorators auto-generate an interactive spec.
- **Unit Tests** — sample tests for pipes, services, and controllers.

---

## Requirements
- **Node.js 18+** (works on 20 LTS)
- **npm** (v9 or above) — Yarn & pnpm also fine.

Optional:
- **Docker** & **Docker Compose** (v2) if you want a one-liner container run.

---

## Getting Started

### 1 Clone & Install
```bash
git clone https://github.com/your-org/book-review-api.git
cd book-review-api
npm install
```

### 2 Environment
No external services are required; the API keeps state in memory.  
If you prefer Postgres or another DB, wire Up TypeORM/Prisma and replace the in-memory maps.

### 3 Run
```bash
# Dev mode with hot-reload 
npm run start:dev

# Production build
npm run build && node dist/main.js
```

### 4 Docker (optional)
```bash
docker build -t book-review-api .
docker run -p 3000:3000 book-review-api
```

The container image is multi-stage and ends up ~100 MB.

---

## API Reference

### Books
| Method | Path | Description |
| ------ | ----------------------- | --------------------------- |
| `POST` | `/books` | Create a new book |
| `GET`  | `/books` | List all books |
| `GET`  | `/books/:id` | Retrieve a single book |
| `PUT`  | `/books/:id` | Full-update a book |
| `DELETE` | `/books/:id` | Delete a book |
| `GET`  | `/books/:id/rating` | Average rating rounded to **one** decimal |

### Reviews (nested)
| Method | Path | Description |
| ------ | ----------------------------------------- | ---------------- |
| `POST` | `/books/:bookId/reviews` | Add a review to a book |
| `GET`  | `/books/:bookId/reviews` | List reviews for a book |
| `GET`  | `/books/:bookId/reviews/:reviewId` | Retrieve one review |
| `DELETE` | `/books/:bookId/reviews/:reviewId` | Remove a review |

> All IDs are integers ≥ 1.  
> Validation errors return `400 Bad Request` with details.

---

## Example Requests

Create a book:
```bash
curl -X POST http://localhost:3000/books   -H "Content-Type: application/json"   -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008
}'
```

Add a review:
```bash
curl -X POST http://localhost:3000/books/1/reviews   -H "Content-Type: application/json"   -d '{
    "rating": 5,
    "comment": "Must-read for every dev."
}'
```

Fetch average rating:
```bash
curl http://localhost:3000/books/1/rating  # → { "average": 4.5 }
```

---

## Testing
```bash
# Unit tests with jest 
npm run test

# Watch mode
npm run test:watch
```

Coverage thresholds are set at **80 %**.

---

## Project Structure
```
src/
├── books/
│   ├── dto/
│   ├── entities/
│   ├── books.controller.ts
│   └── books.service.ts
├── reviews/
│   ├── dto/
│   ├── entities/
│   ├── reviews.controller.ts
│   └── reviews.service.ts
├── common/
│   ├── pipes/
│   │   └── book-exists.pipe.ts
│   └── filters/http-exception.filter.ts
└── main.ts
```
*CSS-like separation:* controllers -> services -> DTOs/entities + **pure helpers** in `common/`.

---

## License

[MIT](LICENSE) © 2025 Your Name / Your Org
