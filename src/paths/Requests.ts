// routes/feed.ts
import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Post } from "../entities/Post";
import { Not } from "typeorm";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { processarImagem } from "../utils";

const router = Router();

router.get("/feed", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        try {
            const decoded = jwt.verify(token, (process.env.JWT_SECRET));

            const userId = decoded.id;
            console.log("userId: ", userId)

            const posts = await AppDataSource.getRepository(Post).find({
                where: {
                    user: { id: Not(userId) }
                },
                relations: ["user", "coments", "likes"],
                order: { createdAt: "DESC" }
            });

            res.json(posts);
        } catch (err) {
            return res.status(401).json({ error: "Token inválido ou expirado" });
        }

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: "Erro ao buscar feed" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const user = req.body.user
        const email = user.email
        const password = user.password
        const username = user.username

        const newUser = await AppDataSource.getRepository(User).save({
            username: username,
            email: email,
            password: password,
            posts: [],
            coments: [],
            likes: []
        })

        res.json({ result: "Usuario cadastrado com sucesso!", user: newUser });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
})

router.post("/login", async (req, res) => {
    try {
        const userLogin = req.body.user
        const email = userLogin.email
        const password = userLogin.password

        const users = await AppDataSource.getRepository(User).find({})

        const newUser = await AppDataSource.getRepository(User).findOne({
            where: {
                email: email,
            }
        })

        if (newUser == undefined) {
            return res.status(500).json({ Erro: "Usuário não encontrado" });
        }

        const user = await AppDataSource.getRepository(User).findOne({
            where: {
                email: email,
                password: password
            }
        })

        if (user != undefined) {
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || "segredo_super_secreto",
                { expiresIn: "1h" }
            );

            return res.json({ token: token });
        } else {
            return res.status(500).json({ Erro: "Senha incorreta" });
        }

    } catch (erro) {
        console.log(erro)
        res.status(500).json({ Erro: "Erro ao efetuar o login" });
    }
})

//-------------------------------------------------

router.post("/addPost", async (req, res) => {
    const newPost = req.body.newPost

    const imageBase64 = newPost.imageBase64 //await processarImagem(newPost.imageBase64)
    const caption = newPost.caption
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded = jwt.verify(token, (process.env.JWT_SECRET));
        const userId = decoded.id;

        console.log("userId: ", userId)

        // const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId }})
        const newPost = await AppDataSource.getRepository(Post).save({
            imageBase64: imageBase64,
            caption: caption,
            user: { id: userId },
            coments: [],
            likes: []
        }).catch(erro => {
            console.log("Erro ao salvar o post: ", erro)
            return res.status(401).json({ error: "Erro ao salvar o post" });
        })

        return res.json({ result: "Post publicado com sucesso!", user: newPost });
    } catch (erro) {
        console.log("Erro ao encontrar o id de usuario responsável pelo post")
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }

})

export default router