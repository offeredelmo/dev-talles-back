import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/rol.enum';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService:UsersService,
        private jwtService: JwtService
        ){}

    async registerUser({
        name,
        phone_number,
        email,
        password,
        discord_id
    }:RegisterDto){
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
          }

        const newUser = await this.usersService.create({
            name,
            phone_number,
            email,
            password: await bcrypt.hash(password, 12) ,
            discord_id,
            role:Role.USER
        })
          
        return await this.usersService.create(newUser)
    }

    async registerAdmin({
        name,
        phone_number,
        email,
        password,
        discord_id
    }:RegisterDto){
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
          }

        const newUser = await this.usersService.create({
            name,
            phone_number,
            email,
            password: await bcrypt.hash(password, 12) ,
            discord_id,
            role:Role.ADMIN
        })
          
        return await this.usersService.create(newUser)
    }

    async login({email,password}:LoginDto){
        const user = await this.usersService.findOneByEmailWhitPassword(email);

        if (!user) {
            throw new UnauthorizedException('is wrong');
          }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('is wrong');
        }

        const payload = { email: user.email, role: user.role};
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            email,
          };
    }
   

}
