import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateAwardDto } from './dto/create-award.dto';


@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Post("/adduser")
  addUserToRoom(
    @Body('id_room', ParseUUIDPipe) id_room: string,
    @Body('id_user', ParseUUIDPipe) id_user: string
  ){
    console.log(id_user, id_room)
    return this.roomsService.addUserToRoom(id_room, id_user)
  }

  @Post("/addaward/:id")
  addAwardToRoom(
    @Param('id', ParseUUIDPipe) id:string,
    @Body() createAwardDto:CreateAwardDto
  ){
    return this.roomsService.addAwardToRoom(id,createAwardDto)
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
  update(@Param('id',ParseUUIDPipe) id:string, @Body() updateRoomDto:UpdateRoomDto){
    return this.roomsService.update(id, updateRoomDto)
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id:string){
    return this.roomsService.remove(id)
  }

  @Delete('/award/:id')
  deleteAwardToRoomById(@Param('id', ParseUUIDPipe) id:string){
    return this.roomsService.deleteAwardToRoomById(id)
  }
}
