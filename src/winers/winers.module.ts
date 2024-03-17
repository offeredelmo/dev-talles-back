import { Module } from '@nestjs/common';
import { WinersService } from './winers.service';
import { WinersController } from './winers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winer } from './entities/winer.entity';
import { User } from 'src/users/entities/user.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Award } from 'src/rooms/entities/award.entity';

@Module({
  controllers: [WinersController],
  providers: [WinersService],
  imports: [TypeOrmModule.forFeature([Winer, User, Room, Award])] // Include RoomModule in imports
})
export class WinersModule {}