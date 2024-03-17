import { Injectable } from '@nestjs/common';
import { CreateWinerDto } from './dto/create-winer.dto';
import { UpdateWinerDto } from './dto/update-winer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Winer } from './entities/winer.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WinersService {
  constructor(
    @InjectRepository(Winer)
    private readonly winerRepository: Repository<Winer>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createWinerDto: CreateWinerDto) {
    const newWiner = this.winerRepository.create(createWinerDto);
  
    // Find the Room and User entities by their ids
    const room = await this.roomRepository.findOne({ where: { id_room: createWinerDto.id_room } });
    const user = await this.userRepository.findOne({ where: { id_user: createWinerDto.id_user } });
  
    // Assign the Room and User entities to the new Winer
    newWiner.room = room;
    newWiner.user = user;
  
    return await this.winerRepository.save(newWiner);
  }
  
  async findWinnersByRoomId(id: string) {
    return await this.winerRepository.createQueryBuilder('winer')
      .innerJoinAndSelect('winer.user', 'user') // Join with User to get user details
      .innerJoinAndSelect('winer.room', 'room') // Join with Room to get room details
      .select(['winer.prize', 'user', 'room']) // Select prize, user details, and room details
      .where('room.id_room = :id', { id }) // Filter by room id
      .getMany();
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