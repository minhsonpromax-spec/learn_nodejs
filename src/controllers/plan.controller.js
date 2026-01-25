import planService from "../services/plan.service.js"
import { successResponse } from "../utils/response.js"

export const createPlan = async (req, res, next) => {
    try {
        const result = await planService.createPlanService(req.body)
        return successResponse(res, result, { 
            status: 201, 
            message: "Plan created" 
        })
    } 
    catch (error) { 
        next(error) 
    }
}

export const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const result = await planService.updateStatusService({ id, status })
        return successResponse(res, result, { 
            message: "Status updated" 
        })
    } 
    catch (error) { 
        next(error) 
    }
}

export const getPlansByUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const result = await planService.getPlansByUserService(userId)
        return successResponse(res, result, { 
            message: "Get Plans successfully" 
        })
    } 
    catch (error) { 
        next(error) 
    }
}

export const addHistory = async (req, res, next) => {
    try {
        const result = await planService.addPlanHistoryService(req.body)
        return successResponse(res, result, { 
            status: 201, 
            message: "Ghi nhận lịch sử mới thành công" 
        })
    } 
    catch (error) { 
        next(error) 
    }
}

export const deletePlanHistory = async (req, res, next) => {
    try {
        const { id } = req.params 
        const result = await planService.deletePlanHistoryService(id)
        return successResponse(res, result, { 
            message: "Deleted" 
        })
    } 
    catch (error) { 
        next(error) 
    }
}

export const deletePlan = async (req, res, next) => {
    try {
        const { id } = req.params 
        const result = await planService.deletePlanService(id)
        return successResponse(res, result, { 
            message: "The plan and data link have been deleted" 
        })
    } 
    catch (error) { 
        next(error) 
    }
}