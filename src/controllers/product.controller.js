import * as productService from "../services/product.service.js"
import { successResponse } from "../utils/response.js"

export const createProduct = async (req, res, next) => {
  try {
    const result = await productService.createProductService(req.body)
    successResponse(res, result, { status: 201, message: "Product created" })
  } 
  catch (error) {
    next(error)
  }
}

export const getAllProducts = async (req, res, next) => {
  try {
    const result = await productService.getAllProductsService(req.query)
    successResponse(res, result)
  } 
  catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
    const result = await productService.getProductByIdService(req.params)
    successResponse(res, result)
  } 

export const updateProduct = async (req, res, next) => {
  try {
    const result = await productService.updateProductService(req.params, req.body)
    successResponse(res, result, { message: "Product updated" })
  } 
  catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProductService(req.params)
    successResponse(res, null, { message: "Product deleted" })
  } 
  catch (error) {
    next(error)
  }
}