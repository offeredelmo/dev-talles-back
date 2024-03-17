import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWinerDto } from './dto/create-winer.dto';
import { UpdateWinerDto } from './dto/update-winer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Winer } from './entities/winer.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { Award } from 'src/rooms/entities/award.entity';

@Injectable()
export class WinersService {
  constructor(
    @InjectRepository(Winer)
    private readonly winerRepository: Repository<Winer>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Award)
    private readonly awardRepository: Repository<Award>, // Add this line
  ) {}

  async create(createWinerDto: CreateWinerDto) {
    const award = await this.awardRepository.findOne({ where: { id_awards: createWinerDto.id_award } });
    
    if (!award) {
      throw new BadRequestException(`Award with ID ${createWinerDto.id_award} not found`);
    }
  
    const newWiner = this.winerRepository.create({
      prize: createWinerDto.prize,
      id_room: { id_room: createWinerDto.id_room },
      id_user: { id_user: createWinerDto.id_user },
      id_award: award, // Add this line
    });
  
    return await this.winerRepository.save(newWiner);
  }

  async findRoomWithDetails(id: string) {
    const room = await this.roomRepository.createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'users')
      .leftJoinAndSelect('room.winers', 'winers')
      .leftJoinAndSelect('winers.id_award', 'award')
      .where('room.id_room = :id', { id })
      .getOne();
  
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
  
    const winersWithAwards = room.winers.filter(winer => winer.id_award !== null);
  
    return {
      id_room: room.id_room,
      name: room.name,
      description: room.description,
      start_date: room.start_date,
      end_date: room.end_date,
      visible: room.visible,
      users: room.users,
      awards: winersWithAwards.map(winer => winer.id_award),
      winers: winersWithAwards.map(({ prize, ...winer }) => winer), // Exclude the prize property
    };
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