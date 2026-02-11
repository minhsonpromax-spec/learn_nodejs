import { AppError } from "../exceptions/app-error";

export const authorization = (permissionRequired) = (req,res,next) => {
    const user = req.user;
    const permissions = user.permissions;
    if(!permissions.include(permissionRequired)) throw new AppError('Forbidden resource',403)
    next();
}