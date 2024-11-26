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

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('getAllCategories')
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get('getAllActiveCategories')
  getAllActiveCategories() {
    return this.categoriesService.getAllActiveCategories();
  }

  @Get('getCategoryByID/:id')
  getCategoryByID(@Param('id') id: number) {
    return this.categoriesService.getCategoryByID(id);
  }

  @Post('createCategory')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Put('updateCategoryByID/:id')
  async updateCategoryByID(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategoryByID(id, updateCategoryDto);
  }

  @Put('deleteCategoryByID/:id')
  async deleteCategoryByID(@Param('id') id: number) {
    return this.categoriesService.deleteCategoryByID(id);
  }
}
