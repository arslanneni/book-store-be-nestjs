import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsOptional()
  @IsString()
  website: string;
}
