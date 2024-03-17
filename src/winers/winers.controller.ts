import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WinersService } from './winers.service';
import { CreateWinerDto } from './dto/create-winer.dto';
import { UpdateWinerDto } from './dto/update-winer.dto';

@Controller('winers')
export class WinersController {
  constructor(private readonly winersService: WinersService) {}

  @Post('/create')
  create(@Body() createWinerDto: CreateWinerDto) {
    return this.winersService.create(createWinerDto);
  }

  @Post('/findWinnersByRoomId/:id')
  findWinnersByRoomId(@Param('id') id: string) {
    return this.winersService.findWinnersByRoomId(id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.winersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWinerDto: UpdateWinerDto) {
    return this.winersService.update(+id, updateWinerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.winersService.remove(+id);
  }
}