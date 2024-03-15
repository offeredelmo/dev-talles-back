import { BadRequestException, Injectable } from '@nestjs/common';
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

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOneBy({ id_room: id });
    if (!room) {
      throw new BadRequestException(`Room with ID ${id} not found`);
    }
    const updatedRoom = this.roomRepository.merge(room, updateRoomDto);
    await this.roomRepository.save(updatedRoom);
    return updatedRoom;
  }

  async remove(id: string) {
    const room = await this.roomRepository.findOneBy({ id_room: id });
    if (!room) {
      throw new BadRequestException(`Room with ID ${id} not found`);
    }
    await this.roomRepository.remove(room);
  
    return `Room with ID ${id} delete`
  }
  
}
