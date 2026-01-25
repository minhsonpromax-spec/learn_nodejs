import express from "express"
import { deleteFileController, readFileController, writeFileController } from "../controllers/file.controller.js"

const router = express.Router()

router.get("/read/:fileName", readFileController)
router.post("/write/:fileName", writeFileController)
router.delete("/:fileName", deleteFileController)

export default router
