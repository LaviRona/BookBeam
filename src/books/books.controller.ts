import {
    Controller, Get, Post, Patch, Delete,
    Param, Body, ParseIntPipe,
} from '@nestjs/common';
import {
    ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

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
    @ApiOkResponse({ type: Book, isArray: true })
    findAll(): Book[] {
        return this.booksService.findAll();
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
}
