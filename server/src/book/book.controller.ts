import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get('/byuser')
    @UseGuards(AuthGuard())
    async getBookByUser(
        @Req()
        req: any
    ):Promise<Book []> {
        console.log(req.user);
        return this.bookService.getBookByUserFromDB(req.user._id);
    }

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }
    
    @Post()
    @UseGuards(AuthGuard())
    async saveBook(
        @Body()
        book: CreateBookDto, //DTO is the type of data we expect from the user
        @Req()
        req: any
    ): Promise<Book> {
        console.log(req.user)
        let userId = req.user._id;
        return this.bookService.createAll(book, userId);
    }

    @Get(':id')
    async findBookbyId(
        @Param('id')
        id: string,
    ): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateBookById(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDto,
    ):Promise<Book> {
        return this.bookService.updateBookById(id, book);
    }
}
