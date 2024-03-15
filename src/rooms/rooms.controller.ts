import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';


@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }
  
  @Get()
  findAll() {
    return this.roomsService.findAllRooms();
  }

  @Get("/visible")
  findAllVisible() {
    return this.roomsService.findVisibleRooms();
  }

  @Put(':id')
  update(@Param('id') id:string, @Body() updateRoomDto:UpdateRoomDto){
    return this.roomsService.update(id, updateRoomDto)
  }

  @Delete(':id')
  delete(@Param('id') id:string){
    return this.roomsService.remove(id)
  }
}
