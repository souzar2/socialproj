import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Post } from './Post';
import { Coments } from './Coments';
import { Likes } from './Likes';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;
  
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Coments, coments => coments.from)
  coments: Coments[];

  @OneToMany(() => Likes, likes => likes.from)
  likes: Likes[];

  //@ManyToMany(() => User, user => user.followers)
  //@JoinTable()
  //following: User[];

  //@ManyToMany(() => User, user => user.following)
  //followers: User
}
