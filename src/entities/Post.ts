import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Timestamp } from 'typeorm';
import { User } from './User';
import { Coments } from './Coments';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Coments, coments => coments.post)
  coments: Coments[];

  @Column()
  tempoexp: Timestamp;
}
