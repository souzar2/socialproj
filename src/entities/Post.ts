import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Coments } from './Coments';
import { Likes } from './Likes';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "longtext"})
  imageBase64: string; //base64

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => User, user => user.posts, { nullable: false })
  user: User;

  @OneToMany(() => Coments, coments => coments.post)
  coments: Coments[];

  @OneToMany(() => Likes, likes => likes.post)
  likes: Likes[];

  @Column({ default: 1 })
  tempoexp: number;
  
}
