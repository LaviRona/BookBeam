import {
    Controller, Get, Post, Patch, Delete,
    Param, Body, ParseIntPipe, Query
} from '@nestjs/common';
import {
    ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiQuery,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { GetBooksQueryDto } from './dto/get-books-query.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    @ApiCreatedResponse({ type: Book })
    create(@Body() dto: CreateBookDto): Book {
        return this.booksService.create(dto);
    }


    @Get()
    @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
    @ApiQuery({ name: 'sortBy', required: false, enum: ['title', 'author', 'year'] })
    @ApiQuery({ name: 'year', required: false, type: Number })
    @ApiQuery({ name: 'title', required: false, type: String })
    @ApiQuery({ name: 'author', required: false, type: String })
    @ApiOkResponse({ type: Book, isArray: true })
    findAll(@Query() query: GetBooksQueryDto): Book[] {
        return this.booksService.findAll(query);
    }


    @Get(':id')
    @ApiOkResponse({ type: Book })
    findOne(@Param('id', ParseIntPipe) id: number): Book {
        return this.booksService.findOne(id);
    }

    @Delete(':id')
    @ApiNoContentResponse()
    remove(@Param('id', ParseIntPipe) id: number): void {
        this.booksService.remove(id);
    }

    @Patch(':id')
    @ApiOkResponse({ type: Book })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateBookDto,
    ): Book {
        return this.booksService.update(id, dto);
    }
}
