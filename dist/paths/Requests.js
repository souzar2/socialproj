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
// routes/feed.ts
const express_1 = require("express");
const data_source_1 = require("../data-source");
const Post_1 = require("../entities/Post");
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log("token: ", token);
        try {
            const decoded = jsonwebtoken_1.default.verify(token, (process.env.JWT_SECRET || "segredo_super_secreto"));
            console.log("decoded: ", decoded);
            const userId = decoded.id;
            const posts = yield data_source_1.AppDataSource.getRepository(Post_1.Post).find({
                where: {
                    user: { id: (0, typeorm_1.Not)(userId) }
                },
                relations: ["user", "coments", "likes"],
                order: { createdAt: "DESC" }
            });
            res.json(posts);
        }
        catch (err) {
            return res.status(401).json({ error: "Token inválido ou expirado" });
        }
    }
    catch (erro) {
        console.error(erro);
        res.status(500).json({ error: "Erro ao buscar feed" });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        const email = user.email;
        const password = user.password;
        const username = user.username;
        const newUser = yield data_source_1.AppDataSource.getRepository(User_1.User).save({
            username: username,
            email: email,
            password: password,
            posts: [],
            coments: [],
            likes: []
        });
        res.json({ result: "Usuario cadastrado com sucesso!", user: newUser });
    }
    catch (erro) {
        console.error(erro);
        res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userLogin = req.body.user;
        const email = userLogin.email;
        const password = userLogin.password;
        const username = userLogin.username;
        const users = yield data_source_1.AppDataSource.getRepository(User_1.User).find({});
        const newUser = yield data_source_1.AppDataSource.getRepository(User_1.User).findOne({
            where: {
                email: email,
            }
        });
        if (newUser == undefined) {
            return res.status(500).json({ Erro: "Usuário não encontrado" });
        }
        const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOne({
            where: {
                email: email,
                password: password
            }
        });
        if (user != undefined) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "segredo_super_secreto", { expiresIn: "1h" });
            return res.json({ token: token });
        }
        else {
            return res.status(500).json({ Erro: "Senha incorreta" });
        }
    }
    catch (erro) {
        console.log(erro);
        res.status(500).json({ Erro: "Erro ao efetuar o login" });
    }
}));
exports.default = router;
