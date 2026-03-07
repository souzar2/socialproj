import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Timestamp, OneToOne } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn() 
  id: number; 
  
  @ManyToOne(() => Post, post => post.likes) 
  post: Post;

  @ManyToOne(() => User, user => user.likes) 
  from: User;
}