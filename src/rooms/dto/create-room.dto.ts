import { ArrayNotEmpty, IsArray, IsBoolean, IsDateString, IsString } from "class-validator";


export class CreateRoomDto {
    @IsString()
    name:string

    @IsString()
    description:string

    @IsDateString()
    start_date:Date

    @IsDateString()
    end_date:Date

    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    awards: string[];

    @IsBoolean()
    visible:boolean 
}
