import {
    changePasswordService, 
    logInService, 
    signUpService,
    requestPasswordRecoveryService,
    recoverPasswordService }
from "../services/user.service.js"
import { successResponse } from "../utils/response.js"

export const logInController = async (req, res, next) => {
    try{
        const {userName, password} = req.body
        const result = await logInService(userName, password)
        return successResponse(res, result, {
            status: 200,
            message: "Logged in"
        })
    }
    catch(error){
        next(error)
    }
}

export const signUpController = async (req, res, next) => {
    try{
        const {userName, password} = req.body
        const result = await signUpService(userName, password)
        return successResponse(res, result, {
            status: 201,
            message: "Signed up"
        })
    }
    catch(error){
        next(error)
    }
}

export const changePasswordController = async (req, res, next) => {
    try{
        const {userName, oldPassword, newPassword} = req.body
        const result = await changePasswordService(userName, oldPassword, newPassword)
        return successResponse(res, result, {
            status: 200,
            message: "Changed password"
        })
    }
    catch(error){
        next(error)
    }
}

export const requestPasswordRecoveryController = async (req, res, next) => {
    try{
        const {email} = req.body
        const result = await requestPasswordRecoveryService(email)
        return successResponse(res, result, {
            status: 200,
            message: "Request received!"
        })
    }
    catch(error){
        next(error)
    }
}

export const recoverPasswordController = async (req, res, next) => {
    try{
        const {email, recoveryCode, newPassword} = req.body
        const result = await recoverPasswordService(email, recoveryCode, newPassword)
        return successResponse(res, result, {
            status: 200,
            message: "Password changed"
        })
    }
    catch(error){
        next(error)
    }
}