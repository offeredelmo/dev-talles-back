import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly usersService: UsersService
  ) { }


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

  async isUserAlreadyInRoom(idRoom: string, idUser: string) {
    // busca si en la tabla pivote de users_rooms ya existe la relacion de user con la room
    // si ya existe la relacion significa que el usuario ya esta suscrito a la room(sorteo)
    const count = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoin('room.users', 'user')
      .where('user.id_user = :idUser', { idUser })
      .andWhere('room.id_room = :idRoom', { idRoom })
      .getCount();
  
    return count > 0;
  }
  
  

  async addUserToRoom(idRoom: string, idUser: string) {

    const room = await this.roomRepository.findOne({
      where: { id_room: idRoom },
      relations: ['users'],
    });

    if (!room) {
      throw new BadRequestException(`Room with ID ${idRoom} not found`);
    }

    const user = await this.usersService.findOneById(idUser)

    if (!user) {
      throw new BadRequestException(`User with ID ${idUser} not found`);
    }

    const isUserAlreadyInRoom = await this.isUserAlreadyInRoom(idRoom, idUser);
    console.log(isUserAlreadyInRoom)
    if (isUserAlreadyInRoom) {
      throw new BadRequestException(`User with ID ${idUser} is already in the room with ID ${room.name}`);
    }
    
    room.users.push(user);
    await this.roomRepository.save(room);

    return `User ${idUser} added to room ${room.name}`;
  }



}
