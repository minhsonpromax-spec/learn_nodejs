import express from "express"
import {
    createPlan,
    updateStatus,
    getPlansByUser,
    addHistory,
    deletePlanHistory,
    deletePlan
} from "../controllers/plan.controller.js"

const router = express.Router()
router.post("/", createPlan)
router.get("/user/:userId", getPlansByUser)
router.patch("/:id/status", updateStatus)
router.delete("/:id", deletePlan)
router.post("/history", addHistory)
router.delete("/history/:id", deletePlanHistory)

export default router