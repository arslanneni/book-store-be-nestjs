import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepo: Repository<Author>,
  ) {}

  async getAllAuthors() {
    try {
      const result = await this.authorRepo.find({});
      if (result.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Author Details Found',
          data: result,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Author Details Not Found',
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
  async getAllActiveAuthors() {
    const allBooksResponse = await this.authorRepo.find({
      where: {
        status: 'ACTIVE',
      } as unknown,
    });
    if (allBooksResponse) {
      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.FOUND,
        message: 'All Active Authors Found',
        data: allBooksResponse,
      };
    } else {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.NOT_FOUND,
        message: 'No Active Authors Found',
        data: [],
      };
    }
  }
  async getAuthorByID(id) {
    try {
      const response = await this.authorRepo.find({
        where: {
          id: id,
        } as unknown,
      });
      if (response.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Author Details Found',
          data: response,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Author Details Not Found',
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
  async createAuthor(createAuthorDto: CreateAuthorDto) {
    try {
      const isAuthorExist = await this.authorRepo.find({
        where: {
          name: createAuthorDto.name,
        } as unknown,
      } as unknown);
      if (isAuthorExist.length > 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Author Already Exists',
          data: [],
        };
      } else {
        const newAuthor = this.authorRepo.create(createAuthorDto);
        const result = await this.authorRepo.save(newAuthor);
        if (result) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Author Created Successfully',
            data: result,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.NOT_IMPLEMENTED,
            message: 'Author Does Not Created',
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
  async updateAuthorByID(id: number, updateAuthorDto: UpdateAuthorDto) {
    try {
      if (updateAuthorDto.name) {
        const existingAuthor = await this.authorRepo.findOne({
          where: { name: updateAuthorDto.name, id: Not(id) },
        });

        if (existingAuthor) {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.BAD_REQUEST,
            message: 'Author with this name already exists',
            data: [],
          };
        }
      }

      const updatedAuthor = await this.authorRepo.update(id, updateAuthorDto);

      if (updatedAuthor.affected === 1) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.CREATED,
          message: 'Author Updated Successfully',
          data: updatedAuthor,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Author Does Not Update',
          data: updatedAuthor,
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
  async deleteAuthorByID(id: number) {
    try {
      const isBookExists = await this.authorRepo.findOne({
        where: {
          id: id,
        },
      });

      if (isBookExists) {
        await this.authorRepo.update(id, { status: 'DELETED' });

        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Author Marked as Deleted',
          data: [],
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Author Details Not Found',
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
