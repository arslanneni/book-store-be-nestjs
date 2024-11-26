import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get('getAllAuthors')
  getAllAuthors() {
    return this.authorsService.getAllAuthors();
  }
  @Get('getAllActiveAuthors')
  getAllActiveAuthors() {
    return this.authorsService.getAllActiveAuthors();
  }
  @Get('getAuthorByID/:id')
  getAuthorByID(@Param('id') id: number) {
    return this.authorsService.getAuthorByID(id);
  }
  @Post('createAuthor')
  async createBook(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }
  @Put('updateAuthorByID/:id')
  async updateAuthorByID(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.updateAuthorByID(id, updateAuthorDto);
  }
  @Put('deleteAuthorByID/:id')
  async deleteAuthorByID(@Param('id') id: number) {
    return this.authorsService.deleteAuthorByID(id);
  }
}
