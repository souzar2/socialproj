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
Object.defineProperty(exports, "__esModule", { value: true });
// routes/feed.ts
const express_1 = require("express");
const data_source_1 = require("../data-source");
const Post_1 = require("../entities/Post");
const typeorm_1 = require("typeorm");
const router = (0, express_1.Router)();
router.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("requser.id: ", (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id) == undefined) {
            res.json([]);
            return;
        }
        const userId = req.user.id;
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
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar feed" });
    }
}));
exports.default = router;
