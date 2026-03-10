import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import cron from "node-cron";

import Requests from "./paths/Requests"
import { Post } from "./entities/Post";
import { In, LessThan } from "typeorm";

const port = 4000
const app = express();
app.use(express.json());

app.use("/", Requests);


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Rotina
//cron.schedule("*/30 * * * *", async () => {
cron.schedule("* * * * *", async () => {
  const result = await AppDataSource.getRepository(Post).createQueryBuilder("post")
    .where("DATE_ADD(post.createdAt, INTERVAL post.tempoexp HOUR) <= NOW()")
    .getMany();


  if (result.length > 0) {
    try {
      await AppDataSource.getRepository(Post).delete({ id: In(result.map(item => item.id)) })
      console.log("Posts expirados:", result.length);
      result.forEach(p => console.log(`Post ${p.id} expirou`));
    } catch (erro) {
      console.log("Erro ao deletar itens expirados")
    }
  }
})

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado!");
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => console.log(error));
