import { IsString } from "class-validator";
import { Role } from "src/common/rol.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id_user:string

    @Column('text')
    name:string

    @Column('text')
    phone_number:string

    @Column({
        type:"text",
        nullable:false,
        })
    email:string

    @Column({
        type:"text",
        nullable:false,
        select:false
    })
    password:string

    @Column({
        type:"text",
        // unique:true
    })
    discord_id:string

    //@Column({default: 'user'})
    //rol: string;

    @Column({
        type: "enum",
        enum: Role,
        nullable: false
    })
    role: Role

    @DeleteDateColumn()
    deletedAt:Date
}
