import { Module } from '@nestjs/common';
import { WinersService } from './winers.service';
import { WinersController } from './winers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winer } from './entities/winer.entity';

@Module({
  controllers: [WinersController],
  providers: [WinersService],
  imports: [TypeOrmModule.forFeature([Winer])]
})
export class WinersModule {}
