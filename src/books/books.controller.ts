import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('getAllBooks')
  findAll() {
    return this.booksService.getAllBooks();
  }
  @Get('getAllActiveBooks')
  getAllActiveBooks() {
    return this.booksService.getAllActiveBooks();
  }
  @Get('getBookByID/:id')
  getBookByID(@Param('id') id: number) {
    return this.booksService.getBookByID(id);
  }
  @Post('createBook')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }
  @Put('updateBook/:id')
  async updateBookByID(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.updateBookByID(id, updateBookDto);
  }
  @Put('deleteBookByID/:id')
  async deleteBookByID(@Param('id') id: number) {
    return this.booksService.deleteBookByID(id);
  }
}
