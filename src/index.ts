import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import cron from "node-cron";

import Requests from "./paths/Requests"
import { Post } from "./entities/Post";
import { LessThan } from "typeorm";

const port = 4000
const app = express();
app.use(express.json());

app.use("/", Requests);


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Rotina
cron.schedule("*/30 * * * *", async () => {
  console.log("Executando rotina a cada 30 minutos:", new Date());
  const result = await AppDataSource.getRepository(Post).find({
    where: {
      
    }
  })
});

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado!");
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => console.log(error));
