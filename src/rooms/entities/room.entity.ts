import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn('uuid')
    id_room:string

    @Column("text")
    name:string

    @Column("text")
    description:string

    @Column("date")
    start_date:Date

    @Column("date")
    end_date:Date

    @Column("text", { array: true })
    awards: string[];

    @Column("boolean")
    visible:boolean
    
    @ManyToMany(() => User)
    @JoinTable()
    users: User[]
}
