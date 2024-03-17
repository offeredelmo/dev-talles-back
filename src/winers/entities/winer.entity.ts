import { Room } from "src/rooms/entities/room.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Award } from "src/rooms/entities/award.entity";

@Entity()
export class Winer {
    @PrimaryGeneratedColumn('uuid')
    id_winer: string;

    @Column("text")
    prize: string;

    @ManyToOne(() => Room, room => room.winers)
    id_room: Room;

    @ManyToOne(() => Award, award => award.winer)
    id_award: Award;

    @ManyToOne(() => User, user => user.id_user)
    id_user: User;
}