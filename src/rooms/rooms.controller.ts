import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateAwardDto } from './dto/create-award.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/rol.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';


@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
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

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Post("/addaward/:id")
  addAwardToRoom(
    @Param('id', ParseUUIDPipe) id:string,
    @Body() createAwardDto:CreateAwardDto
  ){
    return this.roomsService.addAwardToRoom(id,createAwardDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.roomsService.findAllRooms();
  }

  @Get("/visible")
  findAllVisible() {
    return this.roomsService.findVisibleRooms();
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put(':id')
  update(@Param('id',ParseUUIDPipe) id:string, @Body() updateRoomDto:UpdateRoomDto){
    return this.roomsService.update(id, updateRoomDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id:string){
    return this.roomsService.remove(id)
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/award/:id')
  deleteAwardToRoomById(@Param('id', ParseUUIDPipe) id:string){
    return this.roomsService.deleteAwardToRoomById(id)
  }
}
