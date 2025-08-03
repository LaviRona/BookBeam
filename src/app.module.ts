import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [BooksModule, ReviewsModule],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule { }
