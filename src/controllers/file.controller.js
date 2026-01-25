import {
  readFileService,
  writeFileService,
  deleteFileService
} from "../services/file.service.js"
import { successResponse } from "../utils/response.js"

export const readFileController = async (req, res, next) => {
  try {
    const {fileName} = req.params
    const content = await readFileService(fileName)

    return successResponse(res, { fileName, content }, { 
      status: 200,
      message: "Read file successfully" 
    })
  } catch (error) {
    next(error)
  }
}

export const writeFileController = async (req, res, next) => {
  console.log("Wrote!")
  try {
    const {fileName} = req.params
    const { content } = req.body
    const result = await writeFileService(fileName, content)

    return successResponse(res, result, { 
      status: 201, 
      message: "Write file successfully" 
    })
  } catch (error) {
    next(error)
  }
}

export const deleteFileController = async (req, res, next) => {
  try {
    const {fileName} = req.params
    const result = await deleteFileService(fileName)

    return successResponse(res, result, { 
      status: 204,
      message: "Xóa file thành công" 
    })
  } catch (error) {
    next(error)
  }
}
