


import {
    Controller, Get, Post, Patch, Delete,
    Param, Body, ParseIntPipe,
} from '@nestjs/common';
import {
    ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
@ApiTags('Reviews')
@Controller('Reviews')
export class ReviewsController {
    constructor(private readonly ReviewsService: ReviewsService) { }

    @Post()
    @ApiCreatedResponse({ type: Review })
    create(@Body() dto: CreateReviewDto): Review {
        return this.ReviewsService.create(dto);
    }

    @Get('book/:bookId')
    @ApiOkResponse({ type: Review, isArray: true })
    findAllForBook(
        @Param('bookId', ParseIntPipe) bookId: number,
    ): Review[] {
        return this.ReviewsService.getAll(bookId);
    }

    @Get(':id')
    @ApiOkResponse({ type: Number })
    findOne(@Param('id', ParseIntPipe) id: number): Number {
        return this.ReviewsService.getAvg(id);
    }
}
