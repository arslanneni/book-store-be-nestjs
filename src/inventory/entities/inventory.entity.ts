import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  // One-to-one relation with Book, Cascade delete ensures deletion of inventory when book is deleted
  @OneToOne(() => Book, (book) => book.inventory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' }) // This specifies the column that holds the foreign key
  book: Book;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 50, default: 'ACTIVE' })
  status: string;
}
