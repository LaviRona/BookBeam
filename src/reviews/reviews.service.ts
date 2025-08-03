import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

//import { CreateBookDto } from './dto/create-book.dto';
//import { Book } from './entities/book.entity';


@Injectable()
export class ReviewsService {
    private reviews: Review[] = [];
    private id = 1;

    create(dto: CreateReviewDto): Review {
        const review: Review = { id: this.id++, ...dto };
        this.reviews.push(review);
        return review;
    }

    getAll(bookId: number): Review[] {
        return this.reviews.filter(review => review.bookID === bookId);
    }

    findOne(id: number): Review {
        const Review = this.reviews.find((b) => b.id === id);
        if (!Review) throw new NotFoundException(`Review ${id} not found`);
        return Review;
    }

    getAvg(bookId: number): number {
        const bookReviews = this.reviews.filter(review => review.bookID === bookId);
        if (bookReviews.length === 0) return 0;

        const totalRating = bookReviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / bookReviews.length;
    }

}


