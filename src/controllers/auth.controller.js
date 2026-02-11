import { login } from "../services/auth.service.js"
import { successResponse } from "../utils/response.js"

export const loginController = async (req, res) => {
    const {userName, password} = req.body
    const loginResponse = await login(userName, password)
    console.log("token:", loginResponse);
    return successResponse(res, loginResponse, {
        status: 200,
        message: "success"
    })
}