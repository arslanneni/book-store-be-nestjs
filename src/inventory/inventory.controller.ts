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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('createInventory')
  async createInventory(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Get('getAllInventory')
  async getAllInventory() {
    return this.inventoryService.getAllInventory();
  }

  @Get('getInventoryByID/:id')
  async getInventoryByID(@Param('id') id: number) {
    return this.inventoryService.getInventoryByID(id);
  }

  @Put('updateInventoryByID/:id')
  async updateInventoryByID(
    @Param('id') id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.updateInventoryByID(id, updateInventoryDto);
  }

  @Put('deleteInventoryByID/:id')
  async deleteInventoryByID(@Param('id') id: number) {
    return this.inventoryService.deleteInventoryByID(id);
  }
}
