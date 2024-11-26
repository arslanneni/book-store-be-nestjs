import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getAllCategories() {
    try {
      const result = await this.categoryRepo.find({});
      if (result.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Category Details Found',
          data: result,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Category Details Not Found',
          data: result,
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async getAllActiveCategories() {
    try {
      const activeCategories = await this.categoryRepo.find({
        where: {
          status: 'ACTIVE',
        },
      });
      if (activeCategories.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'All Active Categories Found',
          data: activeCategories,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Active Categories Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async getCategoryByID(id: number) {
    try {
      const response = await this.categoryRepo.find({
        where: {
          id: id,
        },
      });
      if (response.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Category Details Found',
          data: response,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Category Details Not Found',
          data: response,
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const isCategoryExist = await this.categoryRepo.find({
        where: {
          name: createCategoryDto.name,
        },
      });
      if (isCategoryExist.length > 0) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Category Already Exists',
          data: [],
        };
      } else {
        const newCategory = this.categoryRepo.create(createCategoryDto);
        const result = await this.categoryRepo.save(newCategory);
        if (result) {
          return {
            status: 'SUCCESS',
            httpcode: HttpStatus.CREATED,
            message: 'Category Created Successfully',
            data: result,
          };
        } else {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.NOT_IMPLEMENTED,
            message: 'Category Does Not Created',
            data: result,
          };
        }
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async updateCategoryByID(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      if (updateCategoryDto.name) {
        const existingCategory = await this.categoryRepo.findOne({
          where: { name: updateCategoryDto.name, id: Not(id) },
        });

        if (existingCategory) {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.BAD_REQUEST,
            message: 'Category with this name already exists',
            data: [],
          };
        }
      }

      const updatedCategory = await this.categoryRepo.update(
        id,
        updateCategoryDto,
      );

      if (updatedCategory.affected === 1) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.CREATED,
          message: 'Category Updated Successfully',
          data: updatedCategory,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Category Does Not Update',
          data: updatedCategory,
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

  async deleteCategoryByID(id: number) {
    try {
      const isCategoryExists = await this.categoryRepo.findOne({
        where: {
          id: id,
        },
      });

      if (isCategoryExists) {
        await this.categoryRepo.update(id, { status: 'DELETED' });

        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Category Marked as Deleted',
          data: [],
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Category Details Not Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }
}
