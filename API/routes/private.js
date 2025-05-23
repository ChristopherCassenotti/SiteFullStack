import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/listar-usuarios", async (req, res) => {
  try {
    /*omite a senha no req*/
    const user = await prisma.user.findMany({ omit: { password: true } });

    res.status(200).json({ message: "Usuários listados", user });
  } catch (err) {
    res.status(500).json({ message: "Erro no server" });
  }
});

export default router;
