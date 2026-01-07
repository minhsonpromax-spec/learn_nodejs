import fs from "fs/promises"
import path from "path"

export const requestLogger = async (req, res, next) => {
  const logPath = path.join(__dirname, "../data/log.txt")

  const logData = {
    time: new Date().toISOString(),
    method: req.method,
    route: req.originalUrl,
    params: req.params,
    query: req.query,
    body: req.body
  }

  try {
    await fs.appendFile(logPath, JSON.stringify(logData) + "\n", "utf8")
  } 
  catch (error) {
    console.error("Failed to write log file")
  }

  next()
}
