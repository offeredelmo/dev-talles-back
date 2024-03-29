import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WinersModule } from './winers/winers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //en produccion se deja en falso
    }),
    UsersModule,
    RoomsModule,
    WinersModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
