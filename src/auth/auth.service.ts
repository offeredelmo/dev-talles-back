import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { UsersService } from 'src/users/users.service';
  import { RegisterDto } from './dto/register.dto';
  import { JwtService } from '@nestjs/jwt';
  import * as bcryptjs from 'bcryptjs';
  import { LoginDto } from './dto/login.dto';
  import { Role } from './enums/rol.enum';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
    ) {}
  
    async register({ name, email, discord_id, phone_number, password, role }: RegisterDto & { role: Role }) {
      const user = await this.usersService.findOneByEmail(email);
  
      if (user) {
        throw new BadRequestException('User already exists');
      }
  
      await this.usersService.create({
        name,
        email,
        discord_id,
        phone_number,
        role, // Agrega el rol al usuario
        password: await bcryptjs.hash(password, 10),
      });
  
      return {
        name,
        email,
        discord_id,
        role, // Devuelve el rol en la respuesta
      };
    }
  
    async login({ email, password }: LoginDto) {
      const user = await this.usersService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException('email is wrong');
      }
  
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('password is wrong');
      }
  
      const payload = { email: user.email, role: user.role };
      const token = await this.jwtService.signAsync(payload);
  
      return {
        token,
        email,
      };
    }
  
    async profile({ email, role }: { email: string; role: string }) {
      return await this.usersService.findOneByEmail(email);
    }
  }