import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Category } from '../../categories/entities/category.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  isbn: string;

  @Column({ type: 'date', nullable: true })
  publicationDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publisher: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 50, default: 'ACTIVE' })
  status: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: 'Book_Authors',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'author_id', referencedColumnName: 'id' },
  })
  authors: Author[];

  @ManyToMany(() => Category, (category) => category.books)
  @JoinTable({
    name: 'Book_Categories',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @OneToMany(() => Inventory, (inventory) => inventory.book)
  inventory: Inventory;
}
