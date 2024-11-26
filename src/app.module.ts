import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { InventoryModule } from './inventory/inventory.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'almari123',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    AuthorsModule,
    InventoryModule,
    CategoriesModule,
  ],
})
export class AppModule {}
