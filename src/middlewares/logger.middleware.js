import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const requestLogger = async (req, res, next) => {
  const logPath = path.join(__dirname, "../data/log.txt")

  const safeBody = { ...req.body };
  delete safeBody.password

  const logData = {
    time: new Date().toISOString(),
    method: req.method,
    route: req.originalUrl,
    params: req.params,
    query: req.query,
    body: safeBody
  }

  try {
    await fs.appendFile(logPath, JSON.stringify(logData) + "\n", "utf8")
  } 
  catch (error) {
    console.error("Failed to write log file")
  }

  next()
}
