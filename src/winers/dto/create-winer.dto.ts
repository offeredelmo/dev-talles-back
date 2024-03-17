import { IsNotEmpty } from "class-validator";

export class CreateWinerDto {
    @IsNotEmpty()
    prize: string;

    @IsNotEmpty()
    id_room: string;

    @IsNotEmpty()
    id_user: string;

    @IsNotEmpty()
    id_award: string; // Add this line
}