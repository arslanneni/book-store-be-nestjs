import { IsInt, IsPositive, IsOptional, IsNumber } from 'class-validator';

export class UpdateInventoryDto {
  @IsInt()
  @IsOptional()
  book_id: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;
}
