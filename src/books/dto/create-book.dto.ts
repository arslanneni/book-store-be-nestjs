import {
  IsString,
  IsOptional,
  IsDate,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  isbn: string;

  @IsDate()
  @IsOptional()
  publicationDate: Date;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsUrl()
  @IsOptional()
  image: string;
}
