import express from "express"
import { deleteFileController, readFileController, writeFileController } from "../controllers/file.controller.js"

const router = express.Router()

router.get("/files/read", readFileController)
router.post("/files/write", writeFileController)
router.delete("files/:", deleteFileController)

export default router
