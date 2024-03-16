import { ArrayNotEmpty, IsArray, IsBoolean, IsDateString, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateAwardDto } from "./create-award.dto";
import { Type } from "class-transformer";


export class CreateRoomDto {
    @IsString()
    name:string

    @IsString()
    description:string

    @IsDateString()
    start_date:Date

    @IsDateString()
    end_date:Date


    @IsBoolean()
    visible:boolean 

    @ValidateNested({ each: true })
    @Type(() => CreateAwardDto)
    @IsArray()
    @IsOptional()
    awards?: CreateAwardDto[];
}
