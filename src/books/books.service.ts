import {
    Injectable,
    ConflictException,
    NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { GetBooksQueryDto } from './dto/get-books-query.dto';

@Injectable()
export class BooksService {
    private books: Book[] = [];
    private id = 1;

    // Helper method to find duplicate 
    private findDuplicate(dto: CreateBookDto): Book | undefined {
        const { title, author, year } = dto;
        return this.books.find(
            (b) =>
                b.title.toLowerCase() === title.toLowerCase() &&
                b.author.toLowerCase() === author.toLowerCase() &&
                b.year === year,
        );
    }

    // Create a new book
    create(dto: CreateBookDto): Book {
        const dup = this.findDuplicate(dto);
        if (dup) {
            throw new ConflictException(
                `A book titled “${dto.title}” by ${dto.author} (${dto.year}) already exists (id ${dup.id}).`,
            );
        }

        const book: Book = { id: this.id++, ...dto };
        this.books.push(book);
        return book;
    }

    // Get all books (from query)
    findAll({ author, title, year, sortBy, order }: GetBooksQueryDto) {
        let result = [...this.books];

        if (author) {
            result = result.filter(b => b.author.toLowerCase() === author.toLowerCase());
        }

        if (title) {
            result = result.filter(b =>
                b.title.toLowerCase().includes(title.toLowerCase()),
            );
        }
        if (year) {
            result = result.filter(b => b.year === year);
        }
        if (sortBy) {
            result.sort((a, b) =>
                order === 'desc'
                    ? (b[sortBy] as any) > (a[sortBy] as any) ? 1 : -1
                    : (a[sortBy] as any) > (b[sortBy] as any) ? 1 : -1,
            );
        }
        return result;
    }

    // Find a book by ID
    findOne(id: number): Book {
        const book = this.books.find((b) => b.id === id);
        if (!book) throw new NotFoundException(`Book ${id} not found`);
        return book;
    }

    // Update a book by ID
    update(id: number, dto: CreateBookDto): Book {
        const index = this.books.findIndex((b) => b.id === id);
        if (index === -1) throw new NotFoundException(`Book ${id} not found`);

        const dup = this.findDuplicate(dto);
        if (dup && dup.id !== id) {
            throw new ConflictException(
                `A book titled “${dto.title}” by ${dto.author} (${dto.year}) already exists (id ${dup.id}).`,
            );
        }

        this.books[index] = { ...this.books[index], ...dto };
        return this.books[index];
    }

    // Delete a book by ID
    remove(id: number): void {
        const idx = this.books.findIndex((b) => b.id === id);
        if (idx === -1) throw new NotFoundException(`Book ${id} not found`);
        this.books.splice(idx, 1);
    }
}
