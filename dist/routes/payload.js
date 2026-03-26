"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/payload.ts
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/payload", (req, res) => {
    const payload = {
        id: 1,
        name: "User",
        email: "user@example.com",
        isActive: true,
    };
    //res.json(payload);
    res.send(`
  <h1>Payload</h1>
  <p>ID: ${payload.id}</p>
  <p>Nome: ${payload.name}</p>
  <p>Email: ${payload.email}</p>
  <p>Ativo: ${payload.isActive}</p>`);
});
exports.default = router;
