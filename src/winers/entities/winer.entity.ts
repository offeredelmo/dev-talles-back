import { IsArray, IsUUID } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Winer {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id_winer:string

    @Column('text')
    @IsArray()
    prize:string
}
