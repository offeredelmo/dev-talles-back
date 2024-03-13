import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  findOneByEmail(email:string) {
    return this.userRepository.findOneBy({email})
  }


  findOneByEmailWhitPassword(email:string){
    return this.userRepository.findOne({
      where: {email},
      select: ["id_user","email","password","role"]
    })
  }
  
}
