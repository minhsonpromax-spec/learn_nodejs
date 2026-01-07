import {
  readFileService,
  writeFileService,
  deleteFileService
} from "../services/file.service.js"

export const readFileController = async (req, res) => {
  try {
    const { name } = req.query
    const content = await readFileService(name)

    res.json({ fileName: name, content })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message
    })
  }
}

export const writeFileController = async (req, res) => {
  try {
    const { fileName, content } = req.body
    const result = await writeFileService(fileName, content)

    res.json(result)
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message
    })
  }
}

export const deleteFileController = async (req, res) => {
  try {
    const { name } = req.params
    const result = await deleteFileService(name)

    res.json(result)
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message
    })
  }
}
