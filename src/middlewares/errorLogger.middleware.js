import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const errorLogger = async (err, req, res, next) => {
  const dataDir = path.join(__dirname, "../data")
  const errorPath = path.join(dataDir, "errors.txt")

  const statusCode = err.statusCode || 500 
  const message = err.message || "Internal server error"

  const errorData = {
    time: new Date().toISOString(),
    statusCode,
    method: req.method,
    route: req.originalUrl,
    message,
    stack: err.stack 
  }

  try {

    await fs.mkdir(dataDir, { recursive: true })
    
    await fs.appendFile(errorPath, JSON.stringify(errorData) + "\n", "utf8")
  } catch (logError) {
    console.error("Critical: Failed to write to errors.txt", logError)
  }
  next(err)
}