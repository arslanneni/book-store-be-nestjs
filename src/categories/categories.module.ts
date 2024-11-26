import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Book } from 'src/books/entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from './entities/category.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Category, Inventory])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
