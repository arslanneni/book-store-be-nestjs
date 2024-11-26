import {
  IsString,
  IsDate,
  IsUrl,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  isbn: string;

  @IsDate()
  @IsNotEmpty()
  publicationDate: Date;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  image: string;
}
