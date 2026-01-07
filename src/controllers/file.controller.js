import { readFileService, writeFileService } from "../services/file.service.js"

export const readFileController = async (req, res) => {
  try {
    const { name } = req.query

    const content = await readFileService(name)

    return res.json({
      fileName: name,
      content
    })

  } catch (error) {
    if (error.message === "Missing file name") {
      return res.status(400).json({
        message: "Missing file name"
      })
    }

    return res.status(404).json({
      message: "File not found"
    })
  }
}

export const writeFileController = async (req, res) => {
    try {
        const {fileName, content} = req.params.body

        const result = await writeFileService(fileName, content)

        return res.json(result)
    }

    catch (error) {
        if(error.message === "Invalid input"){
            return res.status(400).json({
                message: "Filename or Content must be required"
            })
        }

        return res.status(500).json({
            message: "Failed to write file"
        })
    }
}

export const deleteFileController = async (req, res) => {
  try {
    const { name } = req.params

    const result = await deleteFileService(name)

    return res.json(result)

  } catch (error) {
    if (error.message === "Missing file name") {
      return res.status(400).json({
        message: "Missing file name"
      })
    }

    if (error.message === "File not found") {
      return res.status(404).json({
        message: "No such file or directory"
      })
    }

    return res.status(500).json({
      message: "Failed to delete file"
    })
  }
}