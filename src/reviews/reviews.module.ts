import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { BooksModule } from '../books/books.module';


@Module({
  imports: [BooksModule],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})
export class ReviewsModule { }
