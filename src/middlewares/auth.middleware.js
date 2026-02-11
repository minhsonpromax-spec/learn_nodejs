import { verifyToken } from "../services/auth.service";

export const autoMiddleware = async (req, res, next) => {
    const token = req.header['Authorization'].split(" ")[1];
    const user = await verifyToken(token);
    req.user = user;
    next()
}
