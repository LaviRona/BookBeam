import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
    private books: Book[] = [];
    private id = 1;

    create(dto: CreateBookDto): Book {
        const book: Book = { id: this.id++, ...dto };
        this.books.push(book);
        return book;
    }

    findAll(): Book[] {
        return this.books;
    }

    findOne(id: number): Book {
        const book = this.books.find((b) => b.id === id);
        if (!book) throw new NotFoundException(`Book ${id} not found`);
        return book;
    }

    remove(id: number): void {
        const idx = this.books.findIndex((b) => b.id === id);
        if (idx === -1) throw new NotFoundException(`Book ${id} not found`);
        this.books.splice(idx, 1);
    }

    update(id: number, dto: CreateBookDto): Book {
        const book = this.findOne(id);
        Object.assign(book, dto);
        return book;
    }
}
