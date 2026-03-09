"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const body_parser_1 = __importDefault(require("body-parser"));
const Requests_1 = __importDefault(require("./paths/Requests"));
const port = 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", Requests_1.default);
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Banco conectado!");
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}`);
    });
})
    .catch((error) => console.log(error));
