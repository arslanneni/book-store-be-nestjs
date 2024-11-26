import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepo: Repository<Inventory>,
  ) {}

  async createInventory(createInventoryDto: CreateInventoryDto) {
    try {
      // Check if an inventory entry already exists for the given book_id
      const existingInventory = await this.inventoryRepo.findOne({
        where: { book_id: createInventoryDto.book_id } as unknown,
      });

      if (existingInventory) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: `Inventory already exists for book_id ${createInventoryDto.book_id}`,
          data: [],
        };
      }

      const newInventory = this.inventoryRepo.create(createInventoryDto);
      const result = await this.inventoryRepo.save(newInventory);

      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.CREATED,
        message: 'Inventory Created Successfully',
        data: result,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async getAllInventory() {
    try {
      const result = await this.inventoryRepo.find();
      if (result.length > 0) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Inventory Details Found',
          data: result,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'No Inventory Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async getInventoryByID(id: number) {
    try {
      const result = await this.inventoryRepo.findOne({ where: { id } });
      if (result) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.FOUND,
          message: 'Inventory Details Found',
          data: result,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Inventory Not Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async updateInventoryByID(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ) {
    try {
      // Check if the inventory exists
      const inventory = await this.inventoryRepo.find({
        where: { id: id },
        relations: ['book'],
      });

      if (!inventory) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Inventory Not Found',
          data: [],
        };
      }

      // If `book_id` is being updated, ensure no other inventory has the same `book_id`
      if (
        updateInventoryDto.book_id &&
        updateInventoryDto.book_id !== inventory[0]['book']['id']
      ) {
        const existingInventory = await this.inventoryRepo.findOne({
          where: { book_id: updateInventoryDto.book_id } as unknown,
        });

        if (existingInventory) {
          return {
            status: 'FAILURE',
            httpcode: HttpStatus.CONFLICT,
            message: `Another inventory already exists for book_id ${updateInventoryDto.book_id}`,
            data: [],
          };
        }
      }

      // Proceed with updating the inventory
      const updatedInventory = await this.inventoryRepo.update(
        id,
        updateInventoryDto,
      );

      if (updatedInventory.affected === 1) {
        return {
          status: 'SUCCESS',
          httpcode: HttpStatus.OK,
          message: 'Inventory Updated Successfully',
          data: updatedInventory,
        };
      } else {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.CONFLICT,
          message: 'Inventory Update Failed',
          data: [],
        };
      }
    } catch (err) {
      console.error(err);
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }

  async deleteInventoryByID(id: number) {
    try {
      const inventory = await this.inventoryRepo.findOne({ where: { id } });

      if (!inventory) {
        return {
          status: 'FAILURE',
          httpcode: HttpStatus.NOT_FOUND,
          message: 'Inventory Not Found',
          data: [],
        };
      }

      await this.inventoryRepo.update(id, { status: 'DELETED' }); // Mark stock as zero to indicate deletion.
      return {
        status: 'SUCCESS',
        httpcode: HttpStatus.OK,
        message: 'Inventory Marked as Deleted',
      };
    } catch (err) {
      return {
        status: 'FAILURE',
        httpcode: HttpStatus.EXPECTATION_FAILED,
        message: 'EXCEPTION OCCURRED',
      };
    }
  }
}
