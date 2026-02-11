import { AppError } from "../exceptions/app-error.js"
import db from "../models/index.js"
const {Users} = db
import jwt from "jsonwebtoken"

export const login = async (userName, password) =>  {
    const user = await Users.findOne({where: {userName}})
    if(!user)
        throw new AppError("Not found", 4004, 404)
    if(password !== user.password)
        throw new AppError("Not found", 4004, 404)
    const payload = {
        id: user.id,
        userName: user.name,
        email: user.email
    }
    const token = generateToken(payload)
    return {
        success: true,
        token
    }
}

export const verifyToken = (token) => {
    if(!token) throw new AppError('UnAuthentication',401)
    const decoded = jwt.verify(token,process.env.JWT_SECRET_TOKEN)
    return decoded;
}

function generateToken (payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_TOKEN)
}

