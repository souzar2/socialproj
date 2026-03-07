import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import dotenv from "dotenv";
dotenv.config();

import { Likes } from "./entities/Likes";
import { Coments } from "./entities/Coments";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "mysql", 
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT || "3306"), 
  username: process.env.DB_USERNAME, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Post, Likes, Coments],
});
