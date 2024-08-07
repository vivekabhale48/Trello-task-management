import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>, 
    ){}

    async findAll():Promise<Book[]> {
        const books = await this.bookModel.find();
        return books;
    }

    async createAll(book: CreateBookDto, userId:any):Promise<Book> {
        const bookCopy:CreateBookDto = {...book, user: userId}
        const res = await this.bookModel.create(bookCopy);
        return res;
    }

    async findById(id: string):Promise<Book> {
        const book = await this.bookModel.findById(id)

        const isValidId = mongoose.isValidObjectId(id);

        if(!isValidId) {
            throw new BadRequestException('Please Enter the valid id!');
        }

        return book;
    }

    async updateBookById(id: string, book: CreateBookDto):Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        })
    }

    async getBookByUserFromDB(userId: any):Promise<Book []> {
        const book = await this.bookModel.find({user: userId});
        return book;
    }
}
