import { AppError } from "../exceptions/app-error.js"
import db from "../models/index.js"
const {Plans, PlanHistories} = db

export const createPlanService = async (planData) => {
    const { title, description, status, userId, historyText, imageUrl } = planData

    const t = await db.sequelize.transaction()

    try {
        const newPlan = await Plans.create({
            title,
            description,
            status,
            userId
        }, { transaction: t })

        await PlanHistories.create({
            progressText: historyText || "Khởi tạo kế hoạch",
            imageUrl: imageUrl || null,
            planId: newPlan.id
        }, { transaction: t })

        await t.commit() // if ok

        return newPlan.get({ plain: true })
    } 
    catch (error) {
        await t.rollback() // lỗi thì rollback() hết
        throw new AppError("Errors occur during the process of creating a plan" + error.message, 5002, 500)
    }
}

export const updateStatusService = async (planData) => {
    const {id, status} = planData
    const plan = await Plans.findByPk(id)
    if(!plan)
        throw new AppError("Plan not found", 4004, 404)
    plan.status = status
    const updatedPlan = await plan.save()
    return updatedPlan.get({ plain: true });
}

export const getPlansByUserService = async (userId) => {
    const userExists = await db.Users.findByPk(userId)
    if (!userExists) {
        throw new AppError("User not found", 4004, 404)
    }

    const plans = await db.Plans.findAll({
        where: { userId: userId }, 
        order: [['createdAt', 'DESC']],
    })
    return plans
}

export const addPlanHistoryService = async (historyData) => {
    const {planId, ...content} = historyData
    const planExists = await db.Plans.findByPk(planId)
    if (!planExists) {
        throw new AppError("Plan not found", 4004, 404)
    }
    const newHistory = await planHistories.create({planId, ...content})
    return newHistory.get({plain: true})
}

export const deletePlanHistoryService = async (planHistoryId) => {
    const planHistoryExists = await db.PlanHistories.findByPk(planHistoryId)
    if (!planHistoryExists) {
        throw new AppError("Plan history not found", 4004, 404)
    }
    await planHistories.destroy({where: {planHistoryId}})
    return planHistoryId
}

export const deletePlanService = async (planId) => { // delete: cascade
    const planExists = await db.Plans.findByPk(planId)
    if (!planExists) {
        throw new AppError("Plan not found", 4004, 404)
    }
    await planHistories.destroy({where: {planId}})
    return planId
}

export default {
    createPlanService, 
    updateStatusService,
    getPlansByUserService,
    addPlanHistoryService,
    deletePlanHistoryService,
    deletePlanService
}