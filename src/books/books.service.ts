import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Not, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepo: Repository<Book>,
  ) {}
  async getAllBooks() {
    try {
      const result = await this.bookRepo.find({});
      if (result.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Books Details Found',
          data: result,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Books Details Not Found',
          data: result,
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURED',
      };
    }
  }
  async getAllActiveBooks() {
    const allBooksResponse = await this.bookRepo.find({
      where: {
        status: 'ACTIVE',
      } as unknown,
    });
    if (allBooksResponse) {
      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.FOUND,
        message: 'All Active Book Found',
        data: allBooksResponse,
      };
    } else {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.NOT_FOUND,
        message: 'No Active Book Found',
        data: [],
      };
    }
  }
  async getBookByID(id) {
    try {
      const response = await this.bookRepo.find({
        where: {
          id: id,
        } as unknown,
      });
      if (response.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Book Details Found',
          data: response,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Book Details Not Found',
          data: response,
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURED',
      };
    }
  }
  async createBook(createBookDto: CreateBookDto) {
    try {
      const isBookExists = await this.bookRepo.find({
        where: {
          isbn: createBookDto.isbn,
        } as unknown,
      } as unknown);
      if (isBookExists.length > 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Book Already Exists',
          data: [],
        };
      } else {
        const newBook = this.bookRepo.create(createBookDto);
        const result = await this.bookRepo.save(newBook);
        if (result) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Book Created Successfully',
            data: result,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.NOT_IMPLEMENTED,
            message: 'Book Does Not Created',
            data: result,
          };
        }
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURED',
      };
    }
  }
  async updateBookByID(id: number, updateBookDto: UpdateBookDto) {
    try {
      if (updateBookDto.isbn) {
        const existingBook = await this.bookRepo.findOne({
          where: { isbn: updateBookDto.isbn, id: Not(id) } as unknown,
        });

        if (existingBook) {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.BAD_REQUEST,
            message: 'ISBN already exists for another book',
            data: [],
          };
        }
      }

      const updatedBook = await this.bookRepo.update(id, updateBookDto);
      if (updatedBook.affected === 1) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.CREATED,
          message: 'Book Updated Successfully',
          data: updatedBook,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Book Does Not Updated',
          data: updatedBook,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }
  async deleteBookByID(id: number) {
    try {
      const isBookExists = await this.bookRepo.findOne({
        where: {
          id: id,
        },
      });

      if (isBookExists) {
        await this.bookRepo.update(id, { status: 'DELETED' });

        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Book Marked as Deleted',
          data: [],
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Book Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      console.log(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'Exception Occurred',
      };
    }
  }
}
