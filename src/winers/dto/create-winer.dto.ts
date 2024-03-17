//crear un winner

import { IsNotEmpty } from "class-validator";

export class CreateWinerDto {
    @IsNotEmpty()
    prize: string;

    @IsNotEmpty()
    id_room: string;

    @IsNotEmpty()
    id_user: string;
}