import { IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    USER = "user",
    ADMIN = "admin",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id_user:string

    @Column('text')
    @IsString()
    name:string

    @Column('text')
    @IsString()
    phone_number:string

    @Column('text')
    email:string

    @Column('text')
    password:string

    @Column('text')
    discord_id:string

    //@Column({default: 'user'})
    //rol: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
        nullable: false
    })
    rol: UserRole

}
