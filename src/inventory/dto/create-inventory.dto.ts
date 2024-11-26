import { IsInt, IsPositive, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  @IsNotEmpty()
  book_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}
