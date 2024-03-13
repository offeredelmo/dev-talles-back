import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports:[
    TypeOrmModule.forFeature([Room])
  ]
})
export class RoomsModule {}
