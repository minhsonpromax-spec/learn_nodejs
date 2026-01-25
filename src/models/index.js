import { Sequelize } from "sequelize"
import sequelize from "../configs/database.js"

import PlanModel from "./plans.model.js"
import UserModel from "./users.model.js"
import PlanHistories from "./planHistories.model.js"
import ProductModel from "./product.model.js"
import TodoModel from "./todos.model.js"
const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.todos = TodoModel(sequelize)
db.Plans = PlanModel(sequelize)
db.Users = UserModel(sequelize)
db.PlanHistories = PlanHistories(sequelize)
db.Products = ProductModel(sequelize)


Object.values(db).forEach(model => {
  if (model?.associate) {
    model.associate(db)
  }
})

export default db
