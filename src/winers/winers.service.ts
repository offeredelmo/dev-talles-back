import { Injectable } from '@nestjs/common';
import { CreateWinerDto } from './dto/create-winer.dto';
import { UpdateWinerDto } from './dto/update-winer.dto';

@Injectable()
export class WinersService {
  create(createWinerDto: CreateWinerDto) {
    return 'This action adds a new winer';
  }

  findAll() {
    return `This action returns all winers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} winer`;
  }

  update(id: number, updateWinerDto: UpdateWinerDto) {
    return `This action updates a #${id} winer`;
  }

  remove(id: number) {
    return `This action removes a #${id} winer`;
  }
}
