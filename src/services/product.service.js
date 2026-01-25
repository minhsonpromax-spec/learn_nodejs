import db from '../models/index.js'
import { AppError } from "../exceptions/app-error.js"
import { Op } from 'sequelize'
const {Product} = db

export const createProductService = async (data) => {
  return await Product.create(data)
}

export const getAllProductsService = async (query) => {
  const { status, name } = query
  const where = {}

  // Filter theo status 
  if (status) {
    where.status = { [Op.in]: status.split(',') }
  }

  // Search theo name
  if (name) {
    where.name = { [Op.like]: `%${name}%`}
  }

  return await Product.findAll({ where, raw: true })
}

export const getProductByIdService = async (id) => {
  const product = await Product.findByPk(id)
  if (!product) throw new AppError("Product not found",ERROR_NOT_FOUND_CODE,404)
  return product
}

export const updateProductService = async (id, data) => {
  const product = await Product.findByPk(id)
  if (!product) throw new AppError("Product not found",4004, 404)
  
  return await product.update(data)
}

export const deleteProductService = async (id) => {
  const product = await Product.findByPk(id)
  if (!product) throw new AppError("Product not found", 4004, 404)

  await product.destroy() // paranoid
  return { id }
}