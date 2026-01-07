import fs from "fs/promises"
import path from "path"

export const errorLogger = async (err, req, res, next) => {
  const errorPath = path.join(__dirname, "../data/errors.txt")

  const errorData = {
    time: new Date().toISOString(),
    method: req.method,
    route: req.originalUrl,
    message: err.message,
    stack: err.stack
  }

  try {
    await fs.appendFile(errorPath, JSON.stringify(errorData) + "\n", "utf8")
  } 
  catch (error) {
    console.error("Failed to write error file")
  }

  return res.status(500).json({
    message: "Internal server error"
  })
}
