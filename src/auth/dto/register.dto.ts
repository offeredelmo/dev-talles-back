import { Transform } from "class-transformer"
import { IsEmail, IsPhoneNumber, IsString } from "class-validator"

export class RegisterDto {
    @IsString()
    name:string

    // @Transform(({value}) => value.trim())
    @IsString()
    phone_number:string

    @IsEmail()
    email:string


    @IsString()
    password:string


    @IsString()
    discord_id:string

}