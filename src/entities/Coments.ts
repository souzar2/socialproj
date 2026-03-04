import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Timestamp, OneToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Coments {
  @PrimaryGeneratedColumn() 
  id: number; 

  @Column() 
  text: string;
  
  @ManyToOne(() => Post, post => post.coments) 
  post: Post;

  @ManyToOne(() => User, user => user.coments) 
  from: User;
}