import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";


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

}