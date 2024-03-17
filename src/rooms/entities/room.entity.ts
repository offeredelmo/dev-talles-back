import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Award } from "./award.entity";
import { Winer } from "src/winers/entities/winer.entity";

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

    @Column("boolean")
    visible:boolean
    
    @ManyToMany(() => User, { eager:true }) // La relación con User no necesita JoinTable porque ya está definida en users_rooms
    @JoinTable({name:"users_rooms"})
    users: User[]

    @OneToMany(() => Award, (award) => award.room,  { cascade: true, eager:true })
    awards: Award[]

    @OneToMany(() => Winer, (winer) => winer.id_room, { cascade: true, eager:true }) // Relación con Winer
    winers: Winer[]; 
}
