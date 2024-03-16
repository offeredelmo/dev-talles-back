import { IsString } from "class-validator";


export class CreateAwardDto {

    @IsString()
    name:string

    @IsString()
    description:string

}