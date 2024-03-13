import { Role } from "src/auth/enums/rol.enum";

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  phone_number: string;
  discord_id: string;
  role: Role; 
}