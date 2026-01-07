import express from 'express'
import todoRoutes from "./routes/todo.route.js"
import { requestLogger } from './middlewares/logger.middleware.js'
import { errorLogger } from './middlewares/error.middleware.js'

const app = express()


app.use(express.json()) //Chuyển JSON body → req.body

app.use("requestLogger", requestLogger)
app.use("/todos", todoRoutes)
app.use("/files", fileRoute);
app.use("errorLogger", errorLogger)

export default app
