import express from 'express'
import productRoutes from './routes/product.route.js'
import todoRoutes from "./routes/todo.route.js"
import fileRouter from "./routes/file.route.js"
import userRouter from "./routes/user.route.js"
import planRouter from "./routes/plan.route.js"
import authRouter from "./routes/auth.route.js"
import { requestLogger } from './middlewares/logger.middleware.js'
import { errorLogger } from './middlewares/errorLogger.middleware.js'
import { catchError } from './middlewares/catch-exception.js'
import cors from 'cors'

const app = express()

// app.use(
//   cors({
//     origin: [
//       'http://localhost:5501'
//     ],
//     methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   })
// )

app.use(cors())

app.use(express.json()) //Chuyển JSON body → req.body


app.use(requestLogger)
app.use('/products', productRoutes)
app.use("/todos", todoRoutes)
app.use("/files", fileRouter)
app.use("/users", userRouter)
app.use("/plans", planRouter)
app.use("/auth", authRouter)
app.use(errorLogger)
app.use(catchError)

export default app
