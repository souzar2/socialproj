import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Banco conectado!");
    app.listen(3000, () => {
      console.log("🚀 Servidor rodando na porta 3000");
    });
  })
  .catch((error) => console.log(error));
