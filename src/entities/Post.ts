import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Coments } from './Coments';
import { Likes } from './Likes';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;
  
  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Coments, coments => coments.post)
  coments: Coments[];

  @OneToMany(() => Likes, likes => likes.post)
  likes: Likes[];

  @Column()
  tempoexp: number;
}
