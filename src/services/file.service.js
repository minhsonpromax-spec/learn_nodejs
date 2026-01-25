import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url';
import { AppError } from "../exceptions/app-error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // bởi vì es moudle hiện đại không dùng dirname

const DATA_DIR = path.join(__dirname, "../data")

export const readFileService = async (fileName) => {
  if (!fileName) {
    throw new AppError("Missing file name", 400)
  }

  const filePath = path.join(DATA_DIR, fileName)

  try {
    return await fs.readFile(filePath, "utf8")
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new AppError("File not found", 404)
    }
    throw error
  }
}

export const writeFileService = async (fileName, content) => {
  if (!fileName || content === undefined) {
    throw new AppError("Invalid input", 400)
  }

  const filePath = path.join(DATA_DIR, fileName)

  await fs.appendFile(filePath, content, "utf8")

  return {
    fileName,
    message: "Write file successfully"
  }
}

export const deleteFileService = async (fileName) => { 
  if (!fileName) {
    throw new AppError("Missing file name", 400)
  }

  const filePath = path.join(DATA_DIR, fileName)

  try {
    await fs.unlink(filePath)
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new AppError("File not found", 404)
    }
    throw error
  }

  return {
    fileName,
    message: "File deleted successfully"
  }
}
