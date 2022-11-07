import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  login: string;

  @Column('varchar', { length: 50 })
  password: string;

  @Column('varchar', { length: 20 })
  username: string;

  @Column('varchar', { length: 15, nullable: true })
  phoneNumber: string;

  @Column('date', { nullable: true })
  dateOfBirth: Date;

  @Column('varchar', { length: 20, nullable: true })
  sex: string;
}
