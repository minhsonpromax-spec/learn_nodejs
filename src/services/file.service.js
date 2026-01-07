import fs from "fs/promises"
import path from "path"

export const readFileService = async (fileName) => {
  if (!fileName) {
    throw new Error("Missing file name")
  }

  const filePath = path.join(
    __dirname,
    "../data",
    fileName
  )

  const content = await fs.readFile(filePath, "utf8")

  return content
}

  export const writeFileService = async (fileName, content) => {
      if (!fileName || !content) {
          throw new Error("Invalid input")
      }

      const filePath = path.join(
          __dirname,
          "../data",
          fileName
      )
      
      await fs.writeFile(filePath, content, "utf8")

      return {
          fileName,
          message: "Write file successfully"
      }
  }


export const deleteFileService = async (fileName) => {
  if (!fileName) {
    throw new Error("Missing file name")
  }

  const filePath = path.join(
    __dirname,
    "../data",
    fileName
  )

  try {
    await fs.unlink(filePath)
  } 
  
  catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("File not found")
    }
  }

  return {
    fileName,
    message: "File deleted successfully"
  }
}

