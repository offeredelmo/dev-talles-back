import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";
import { Winer } from "src/winers/entities/winer.entity";

@Entity()
export class Award {
    @PrimaryGeneratedColumn('uuid')
    id_awards:string

    @Column("text")
    name:string

    @Column("text")
    description:string

    @ManyToOne(() => Room, (room) => room.awards,  {  onDelete: 'CASCADE' })
    room: Room

    @ManyToOne(() => Winer, (winer) => winer.id_winer) // Add relationship with Winer
    winer: Winer
}