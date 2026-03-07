import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";

import Requests from "./paths/Requests"

const port = 4000
const app = express();
app.use(express.json());

app.use("/", Requests);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado!");
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => console.log(error));
