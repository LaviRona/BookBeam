import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { BooksService } from '../books/books.service';

@Injectable()
export class ReviewsService {
    constructor(private readonly booksService: BooksService) { }
    private readonly reviewsByBook = new Map<number, Review[]>();
    private nextId = 1;

    /** Add a review to a book */
    create(dto: CreateReviewDto): Review {
        //Validate the book exists (throws NotFoundException if missing)
        this.booksService.findOne(dto.bookID);
        const review: Review = { id: this.nextId++, ...dto };

        // bucket = existing list or new empty list
        const bucket = this.reviewsByBook.get(dto.bookID) ?? [];
        bucket.push(review);
        this.reviewsByBook.set(dto.bookID, bucket);

        return review;
    }

    /** Get all reviews for a book */
    getAll(bookId: number): Review[] {
        this.booksService.findOne(bookId); // Validate the book exists (throws NotFoundException if missing)
        // Return an empty array instead of undefined for nicer controller code
        return this.reviewsByBook.get(bookId) ?? [];
    }

    /** Average rating for a book (0 if no reviews) */
    getAvg(bookId: number): number {
        this.booksService.findOne(bookId); // Validate the book exists (throws NotFoundException if missing)
        const bucket = this.reviewsByBook.get(bookId);
        if (!bucket?.length) return 0;
        const total = bucket.reduce((sum, r) => sum + r.rating, 0);
        return total / bucket.length;
    }
}
