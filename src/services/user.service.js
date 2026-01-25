import { AppError } from "../exceptions/app-error.js";
import { Op, where } from "sequelize";
import db from '../models/index.js';
import { application } from "express";
const {Users} = db

export const logInService = async (userName, password) => {
    const user = await Users.findOne({where: {userName}})

    if(!user)
        throw new AppError("Account not found", 4000, 404)

    if(user.password !== password)
        throw new AppError("Incorrect Password", 4001, 401 )
    const { password: _, ...userWithoutPassword } = user.toJSON()
    return userWithoutPassword
}

export const signUpService = async (userName, password) => {
    if(!userName || !password)
        throw new AppError("Invalid input", 4000, 400)
    const existingUser = await Users.findOne({where: {userName}})
    if(existingUser)
        throw new AppError("userName has already existed", 4009, 409)
    return await Users.create({userName, password})
}

export const changePasswordService = async (userName, oldPassword, newPassword) => {
    if(!userName || !oldPassword || !newPassword)
        throw new AppError("Invalid input", 4000, 400)

    const user = await Users.findOne({where: {username: userName}})
    if(!user)
        throw new AppError("Account not found", 4000, 404)
    if(user.password !== oldPassword)
        throw new AppError("Incorrect Password", 4001, 401 )
    if(oldPassword === newPassword)
        throw new AppError("new password must be different from old password", 4009, 409)

    user.password = newPassword;
    const updateUser = await user.save()
    return updateUser.get({ plain: true })
}

export const requestPasswordRecoveryService = async (email) => { // khi user gửi request 
    const user = await Users.findOne({where: {email}})
    if(!user)
        return
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    user.resetOtp = otp
    user.resetOtpExpire = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    await user.save()
    await transporter.sendMail({
        to: user.email,
        subject: 'Password Reset OTP',
        html: `
            <p>Your password reset code is:</p>
            <h2>${otp}</h2>
            <p>This code will expire in 10 minutes.</p>`
    })
    return { message: 'RECOVERY_REQUEST_PROCESSED' }
}

export const recoverPasswordService = async (email, recoveryCode, newPassword) => { // khi người dùng confirm
    const user = await Users.findOne({where: {
        email,
        resetOtp: recoveryCode,
        resetOtpExpire: {[Op.gt]: new Date()}
    }})
    if(!user)
        throw new AppError("Invalid or expired OTP", 4004, 404)
    user.password = newPassword
    user.resetOtp = null
    user.resetOtpExpire = null
    await user.save()
    return { message: 'PASSWORD_CHANGED' }
}

export default {
    logInService,
    signUpService,
    changePasswordService,
    requestPasswordRecoveryService,
    recoverPasswordService
}