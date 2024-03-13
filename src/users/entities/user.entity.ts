import { IsString } from "class-validator";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    @IsString()
    name:string

    @Column('text')
    email:string

    @Column('text')
    password:string

    @Column({ type: 'text', nullable: true })
    discord_id: string;


    @Column({ default: 'user' })
    role: string;
  
}
