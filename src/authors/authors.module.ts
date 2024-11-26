import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Author } from './entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Category, Inventory])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
