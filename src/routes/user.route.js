import express from "express"
import { 
    logInController, 
    signUpController, 
    changePasswordController 
} from "../controllers/user.controller.js"

const router = express.Router()
router.post("/signup", signUpController)
router.post("/login", logInController)
router.patch("/change-password", changePasswordController)

export default router