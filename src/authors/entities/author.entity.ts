import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', length: 50, default: 'ACTIVE' })
  status: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
