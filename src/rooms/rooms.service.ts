import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository:Repository<Room>
  ){}


  async create(createRoomDto: CreateRoomDto) {
    const newRoom = this.roomRepository.create(createRoomDto);
    await this.roomRepository.save(newRoom);
    return newRoom;
  }

  async findAllRooms() {
    return await this.roomRepository.find();
  }

  async findVisibleRooms() {
    return this.roomRepository.find({
      where: {
        visible: true,
      },
    });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
  
}
