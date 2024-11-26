import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('Inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Book, (book) => book.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
