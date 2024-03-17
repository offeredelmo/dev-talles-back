import { IsArray } from "class-validator";
import { Room } from "src/rooms/entities/room.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Winer {
    @PrimaryGeneratedColumn('uuid')
    id_winer: string;

    @Column('text')
    @IsArray()
    prize: string;

    @ManyToOne(() => Room, room => room.winers)
    room: Room;

    @ManyToOne(() => User, user => user.id_user)
    user: User;
}