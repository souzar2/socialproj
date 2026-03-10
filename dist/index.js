"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const body_parser_1 = __importDefault(require("body-parser"));
const node_cron_1 = __importDefault(require("node-cron"));
const Requests_1 = __importDefault(require("./paths/Requests"));
const Post_1 = require("./entities/Post");
const typeorm_1 = require("typeorm");
const port = 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", Requests_1.default);
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
//Rotina
//cron.schedule("*/30 * * * *", async () => {
node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Executando rotina a cada 30 minutos:", new Date());
    const result = yield data_source_1.AppDataSource.getRepository(Post_1.Post).createQueryBuilder("post")
        .where("DATE_ADD(post.createdAt, INTERVAL post.tempoexp HOUR) <= NOW()")
        .getMany();
    if (result.length > 0) {
        try {
            yield data_source_1.AppDataSource.getRepository(Post_1.Post).delete({ id: (0, typeorm_1.In)(result.map(item => item.id)) });
            console.log("Posts expirados:", result.length);
            result.forEach(p => console.log(`Post ${p.id} expirou`));
        }
        catch (erro) {
            console.log("Erro ao deletar itens expirados");
        }
    }
}));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Banco conectado!");
    app.listen(port, () => {
        console.log(`🚀 Servidor rodando na porta ${port}`);
    });
})
    .catch((error) => console.log(error));
