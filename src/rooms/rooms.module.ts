import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { UsersModule } from 'src/users/users.module';
import { Award } from './entities/award.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports:[
    UsersModule,
    TypeOrmModule.forFeature([Room, Award])
  ]
})
export class RoomsModule {}
